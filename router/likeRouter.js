const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const commentLike = require('../models/commentLike');
const commentInfo = require('../models/commentInfo');
const productLike = require('../models/productLike');
const productInfo = require('../models/productInfo');

const authenticateToken = require('../middleware/authMiddleware.js');
const ProductLike = require('../models/productLike');



// 상품 좋아요 생성
router.post('/products/like/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.locals.user.userId;

        const existingLike = await ProductLike.findOne({
            where: {
                user_id: userId,
                product_id: productId,
            },
        });

        if (existingLike) {
            return res.status(400).json({ error: '이미 좋아요를 누른 상품입니다.' });
        }

        await ProductLike.create({
            user_id: userId,
            product_id: productId,
        });

        res.status(201).json({ message: '상품에 좋아요를 눌렀습니다' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
});

// 상품 좋아요 취소
router.delete('/products/like/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.locals.user.userId;

        const like = await ProductLike.findOne({
            where: {
                user_id: userId,
                product_id: productId,
            },
        });

        if (!like) {
            return res.status(404).json({ error: '해당 상품에 대한 좋아요를 찾을 수 없습니다.' });
        }

        await like.destroy();

        res.json({ message: '상품 좋아요 취소 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
});


// 댓글 좋아요 생성
router.post('/comments/like/:commentId', authenticateToken, async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.locals.user.userId;

        const existingLike = await commentLike.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
            },
        });

        if (existingLike) {
            return res.status(400).json({ error: '이미 좋아요를 누른 댓글입니다.' });
        }

        await commentLike.create({
            user_id: userId,
            comment_id: commentId,
        });

        res.status(201).json({ message: '댓글 좋아요 추가 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
});

// 댓글 좋아요 취소
router.delete('/comments/like/:commentId', authenticateToken, async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.locals.user.userId;

        const like = await commentLike.findOne({
            where: {
                user_id: userId,
                comment_id: commentId,
            },
        });

        if (!like) {
            return res.status(404).json({ error: '해당 댓글에 대한 좋아요를 찾을 수 없습니다.' });
        }

        await like.destroy();

        res.json({ message: '댓글 좋아요 취소 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류' });
    }
});


module.exports = router;

