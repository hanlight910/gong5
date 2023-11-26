const express = require('express');
const router = express.Router();

require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const CommentInfo = require('../models/commentInfo');
const UserInfo = require('../models/userInfo');
const ProductInfo = require('../models/productInfo');
const authenticateToken = require('../middleware/authMiddleware');

// 댓글 생성
router.post('/comment/:product_id', authenticateToken, async (req, res) => {
  try {
    const { comment } = req.body;

    const product_id = req.params.product_id;

    const userId = req.locals.user.userId;

    const addComment = await CommentInfo.create({
      comment,
      product_id: product_id,
      user_id: userId
    });

    res.status(201).json({ message: '댓글 등록 완료', addComment });

    // 새로고침 
    // location.reload();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러' });
  }

});

// 댓글 수정
router.put('/comment/:commentId', authenticateToken, async (req, res) => {
  try {
    const { comment } = req.body;
    const commentId = req.params.commentId;
    const userId = req.locals.user.userId;

    const existcomment = await CommentInfo.findByPk(commentId);

    if (existcomment.user_id !== userId) {
      return res.status(403).json({ error: '해당 상품을 수정할 권한이 없습니다.' })
    }

    await existcomment.update({ comment });

    res.status(201).json({ message: "댓글을 수정하였습니다.", comment: existcomment });

    // 새로고침 
    location.reload();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러' });
  }

});

// 댓글 삭제
router.delete('/comment/:commentId', authenticateToken, async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.locals.user.userId;

    const existcomment = await CommentInfo.findByPk(commentId);

    if (existcomment.user_id !== userId) {
      return res.status(403).json({ error: '해당 상품을 삭제할 권한이 없습니다.' })
    }

    await existcomment.destroy();

    res.status(201).json({ message: "댓글을 삭제하였습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러' });
  }

});

module.exports = router;