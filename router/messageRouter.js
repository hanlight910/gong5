const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const ProductInfo = require('../models/productInfo');
const authenticateToken = require('../middleware/authMiddleware.js');

router.get('/', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});

router.get('/message/:productId', authenticateToken, async (req, res) => {
  const product_id = Number(req.params.productId);
  const send_user = req.locals.user.userId;

  try {
    const product = await ProductInfo.findOne({
      where: { id: product_id }
    });

    const messages = await Message.findAll({
      where: {
        product_id,
        get_user: product.user_id,
        send_user
      }
    });

    return res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});


router.post('/message', authenticateToken, async (req, res) => {
  const { get_user, test_message } = req.body;
  const userId = req.locals.user.userId;
  try {
    const newMessage = await Message.create({
      send_user: userId,
      get_user,
      test_message,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
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
