const express = require('express');
const router = express.Router();
const Product = require('../models/productInfo');
const authenticateToken = require('../middleware/authMiddleware.js');
const imageUploader = require('../middleware/imageUploader.js');
const userInfo = require('../models/userInfo');
const commentInfo = require('../models/commentInfo')
const CommentLike = require('../models/commentLike')
const Tag = require('../models/tag')
const { Sequelize, Op } = require('sequelize');
const ProductLike = require('../models/productLike');




//생성
router.post('/products', authenticateToken, async (req, res) => {
	console.log("req.body", req.body)
	try {
		const { title, price, description, tags } = req.body;

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

		if (!description) {
			return res.status(400).json({
				success: false,
				message: '설명 입력이 필요합니다.',
			});
		}


		const userId = req.locals.user.userId;
		const image = req.file ? req.file.key : null;	//req.file이 정의되지 않았을 때 해당 속성을 읽으려고 하여 발생하는 오류 해결

		const product = await Product.create({
			user_id: userId,
			title,
			price,
			constents: description,
		});

		res.status(201).json({ product });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.' });
	}
});

//수정
router.put('/products/:productId', authenticateToken, imageUploader.single('image'), async (req, res) => {
	try {
		const { title, content, price, status } = req.body;
		const { productId } = req.params;
		const userId = req.locals.user.userId;

		const existingProduct = await Product.findByPk(productId);


		await existingProduct.update({
			title,
			content,
			price,
			status,
			image: req.file.key,
		});

		res.status(201).json({ message: '상품을 수정하는데 성공하였습니다' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.' });
	}
});

//삭제
router.delete('/products/:productId', authenticateToken, async (req, res) => {
	try {
		const { productId } = req.params;
		const userId = req.locals.user.userId;

		await CommentLike.destroy({
			where: {
				user_id: userId,
				[Op.or]: [
					{
						comment_id: {
							[Op.in]: Sequelize.literal(`(SELECT id FROM comment_info WHERE product_id = ${productId})`)
						}
					},
				]
			}
		});

		await commentInfo.destroy({ where: { product_id: productId } });

		await Product.destroy({ where: { id: productId } });

		res.json({ message: '상품이 성공적으로 삭제되었습니다.' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.' });
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
			attributes: ['id', 'title', 'price', 'content', 'status', 'image', 'delivery', 'like', 'watched', 'createdAt', 'updatedAt',],
			order,
			include: {
				model: userInfo,
				attributes: ['name'],
			},
		});

		res.json({ products });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.' });
	}
});

//상세 조회
router.get('/products/:productId', async (req, res) => {
	try {
		const productId = req.params.productId;

		const product = await Product.findOne({
			where: { id: productId },
			include: [
				{
					model: userInfo,
					attributes: ['id', 'name'],
				},
				{
					model: ProductLike,
					attributes: ['id'],
				},
				{
					model: commentInfo,
					attributes: ['id', 'comment', 'user_id'],
					include: [
						{
							model: userInfo,
							attributes: ['id', 'name', 'email'],
						},
						{
							model: CommentLike,
							attributes: ['id', 'user_id', 'comment_id'],
						},
					],
				},
			],
		});

		if (!product) {
			return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
		}
		const productInfo = {
			id: product.id,
			title: product.title,
			price: product.price,
			content: product.content,
			status: product.status,
			image: product.image,
			delivery: product.delivery,
			username: product.user_info.name,
			like: product.like,
			commentInfo: product.comment_infos,
			product_likes: product.product_likes,
			watched: product.watched,
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
			likes: product.like,
		};

		res.json({ product: productInfo });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.' });
	}
});

const createTags = async (product, tags) => {
	const createdTags = [];

	const parsedTags = tags.split(','); // split으로 수정, ','기준으로 태그 나눠서 배열로 만듦

	for (const tagText of parsedTags) {
		const createdTag = await Tag.create({
			product_id: product.id,
			tag_text: tagText,
		});
		createdTags.push(createdTag);
	}

	return createdTags;
};

module.exports = router;
