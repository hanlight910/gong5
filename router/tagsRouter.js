const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const ProductInfo = require('../models/productInfo');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/tags', authenticateToken, async (req, res) => {
    try {
        const { product_id, tag_text } = req.body;

        if (!product_id || !tag_text) {
            return res.status(400).json({
                message: '상품 ID와 태그 텍스트는 필수 입력 사항입니다.',
            });
        }

        const product = await ProductInfo.findByPk(product_id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: '상품을 찾을 수 없습니다.',
            });
        }

        const tag = await Tag.create({
            product_id,
            tag_text,
        });

        res.status(201).json({
            success: true,
            message: '태그가 성공적으로 생성되었습니다.',
            tag,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: '서버 오류',});
    }
});

router.get('/tags/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        const tags = await Tag.findAll({
            where: { product_id: productId },
            include: ProductInfo,
        });

        res.json({ tags });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: '서버 오류',
        });
    }
});

module.exports = router;
