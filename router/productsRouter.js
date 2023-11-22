const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const authenticateToken = require('../middleware/authMiddleware');

//생성
router.post('/products', authenticateToken, async (req, res) => {
	try {
		const { title, price, content } = req.body;

		if (!title) {
			return res.status(400).json({
			  success: false,
			  message: '제목 입력이 필요합니다.',
			});
		  }

		  if (!price) {
			return res.status(400).json({
			  success: false,
			  message: '가격 입력이 필요합니다.',
			});
		  }

		if (!content) {
			return res.status(400).json({
			  success: false,
			  message: '설명 입력이 필요합니다.',
			});
		  }
		  

		const userId = req.locals.user.userId;
		const product = await Product.create({
			id,
			user_id,
			title,
			price,
			content,
			status: 'FOR_SALE',
			image,
			delivery,
			good,
			watched,
		});
		res.status(201).json({ message: '상품을 생성하는데 성공하였습니다' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.' });
	}
});

//수정
router.put('/product/:productId', authenticateToken, async (req, res) => {
	try {
		const { title, content, price, status } = req.body;
		const { productId } = req.params;
		const userId = req.locals.user.userId;

		const existingProduct = await Product.findByPk(productId);

		if (!existingProduct) {
			return res.status(404).json({ error: '해당 제품이 존재하지 않습니다.' });
		}

		if (existingProduct.userId !== userId) {
			return res
				.status(403)
				.json({ error: '해당 상품을 수정할 권한이 없습니다.' });
		}

		await existingProduct.update({
			title,
			content,
			price,
			status,
		});

		res.status(201).json({ product: existingProduct });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류' });
	}
});

//삭제
router.delete('/product/:productId', authenticateToken, async (req, res) => {
	try {
		const { productId } = req.params;
		const userId = req.locals.user.userId;

		const existingProduct = await Product.findByPk(productId);

		if (!existingProduct) {
			return res.status(404).json({ error: '해당 제품이 존재하지 않습니다.' });
		}

		if (existingProduct.userId !== userId) {
			return res
				.status(403)
				.json({ error: '해당 상품을 삭제할 권한이 없습니다.' });
		}

		await existingProduct.destroy();

		res.json({ message: '상품이 성공적으로 삭제되었습니다.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류' });
	}
});

//목록 조회
router.get('/products', async (req, res) => {
	try {
		const { sort } = req.query;

		const order =
			sort && sort.toUpperCase() === 'ASC'
				? [['createdAt', 'ASC']]
				: [['createdAt', 'DESC']];

		const products = await Product.findAll({
			attributes: ['id', 'title', 'price', 'content', 'status', 'createtime', 'updatetime', 'image', 'delivery', 'good', 'watched'],
			order,
			include: {
				model: Auth,
				attributes: ['username'],
			},
		});

		res.json({ products });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류' });
	}
});

//상세 조회
router.get('/product/:productId', async (req, res) => {
	try {
		const productId = req.params.productId;

		const product = await Product.findOne({
			where: { id: productId },
			include: [
				{
					model: Auth,
					attributes: ['id', 'username'],
				},
			],
		});

		if (!product) {
			return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
		}

		const productInfo = {
			id: product.id,
			title: product.title,
			content: product.content,
			username: product.Auth.username,
			status: product.status,
			createdAt: product.createdAt,
		};

		res.json({ product: productInfo });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류' });
	}
});

module.exports = router;
