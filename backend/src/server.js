require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const { PinataSDK } = require('pinata-web3')

const app = express()
const upload = multer()
const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY,
})

const CampaignSchema = new mongoose.Schema(
  {
    aleoTxId: { type: String, required: true },
    campaignId: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    creativeURI: { type: String, required: true },
    category: { type: String, required: true },
    ownerAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
)

const Campaign = mongoose.model('Campaign', CampaignSchema)

app.use(cors())
app.use(express.json())

app.post('/api/campaigns', async (req, res) => {
  const created = await Campaign.create(req.body)
  res.status(201).json(created)
})

app.get('/api/campaigns', async (_req, res) => {
  const campaigns = await Campaign.find().sort({ createdAt: -1 })
  res.json(campaigns)
})

app.post('/api/upload', upload.single('creative'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Missing creative file' })
  }

  const file = new File([req.file.buffer], req.file.originalname, { type: req.file.mimetype })
  const uploadResponse = await pinata.upload.file(file)
  res.json({
    cid: uploadResponse.IpfsHash,
    uri: `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadResponse.IpfsHash}`,
  })
})

app.get('/api/embed.js', (req, res) => {
  const campaignId = Number(req.query.campaignId)
  const script = `(() => {
  const frame = document.createElement('iframe');
  frame.src = '${process.env.PUBLIC_BASE_URL || 'http://localhost:8080'}/api/embed-frame?campaignId=${campaignId}';
  frame.width = '100%';
  frame.height = '250';
  frame.style.border = 'none';
  const slot = document.getElementById('adnode-slot');
  if (slot) slot.appendChild(frame);
})();`
  res.type('application/javascript').send(script)
})

app.get('/api/embed-frame', async (req, res) => {
  const campaignId = Number(req.query.campaignId)
  const campaign = await Campaign.findOne({ campaignId })
  if (!campaign) {
    return res.status(404).send('Campaign not found')
  }

  res.type('text/html').send(`
<!doctype html>
<html><body style="margin:0;background:#020617;color:#fff;font-family:Arial">
  <a href="#" style="display:block;text-decoration:none;color:inherit">
    <img src="${campaign.creativeURI}" style="width:100%;height:250px;object-fit:cover" alt="${campaign.title}" />
  </a>
</body></html>
`)
})

const port = Number(process.env.PORT || 8080)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/adnode').then(() => {
  app.listen(port, () => {
    console.log(`backend listening on ${port}`)
  })
})
