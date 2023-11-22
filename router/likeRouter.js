const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ProductLike = require('../models/productLike');


// 사용자가 좋아요 누른 상품 조회
router.get('/users/:userId/liked-products', async (req, res) => {
    try {
        const { userId } = req.params;

       
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