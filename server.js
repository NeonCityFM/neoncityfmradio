import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Message from './models/Message.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Verbonden met MongoDB'))
  .catch((err) => console.error('❌ MongoDB fout:', err));

// Haal alle berichten op
app.get('/messages', async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
});

// Voeg nieuw bericht toe
app.post('/messages', async (req, res) => {
  const { username, text } = req.body;
  const message = new Message({ username, text });
  await message.save();
  res.status(201).json(message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);
});
