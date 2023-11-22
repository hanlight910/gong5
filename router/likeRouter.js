const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const CommentLike = require('../models/commentLike');
const ProductLike = require('../models/productLike');

// 사용자가 좋아요를 누른 댓글 조회 API
router.get('/users/:userId/liked-comments', async (req, res) => {
    try {
        const { userId } = req.params;

        // 해당 사용자가 좋아요를 누른 댓글들 조회
        const likedComments = await CommentLike.findAll({
            where: {
                user_id: userId
            }
        });

        res.json({ likedComments: likedComments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
});

// 사용자가 좋아요를 누른 상품 조회 API
router.get('/users/:userId/liked-products', async (req, res) => {
    try {
        const { userId } = req.params;

        // 해당 사용자가 좋아요를 누른 상품들 조회
        const likedProducts = await ProductLike.findAll({
            where: {
                user_id: userId
            }
        });

        res.json({ likedProducts: likedProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
});

module.exports = router;