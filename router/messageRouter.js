const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.get('/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ error: '메시지가 존재하지 않습니다.' });
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.post('/message', async (req, res) => {
  const { send_user, get_user, test_message } = req.body;

  try {
    const newMessage = await Message.create({
      send_user,
      get_user,
      test_message,
    });
    console.log('Message created successfully:', newMessage);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.put('/:id', async (req, res) => {
  const messageId = req.params.id;
  const { send_user, get_user, test_message } = req.body;

  try {
    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ error: '메시지가 존재하지 않습니다.' });
    }

    await message.update({
      send_user,
      get_user,
      test_message,
    });

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.delete('/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ error: '메시지가 없습니다.' });
    }

    await message.destroy();

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
