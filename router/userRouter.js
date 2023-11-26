require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const authenticateToken = require('../middleware/authMiddleware');
const imageUploader = require('../middleware/imageUploader.js');
const Auth = require('../models/userInfo');
const { userInfo } = require('os');

router.post('/signup', async (req, res) => {
	try {
		const { email, password, name } = req.body;

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (!emailRegex.test(email)) {
			res.status(400).json({ error: "이메일 형식이 맞지 않습니다." })
		}

		const existingUser = await Auth.findOne({
			where: {
				[Op.or]: [{ email: email }],
			},
		});

		if (existingUser) {

			return res
				.status(400)
				.json({ error: '이미 존재하는 email이 있습니다.' });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ error: '비밀번호가 6자리 이상이어야 합니다.' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await Auth.create({
			email,
			password: hashedPassword,
			name,
		});

		const responseUser = {
			id: user.id,
			email: user.email,
			username: user.username,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};

		res.status(201).json({ message: '회원가입 성공!', user: responseUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 에러' });
	}
},
);

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Auth.findOne({ where: { email: email } });

		if (!user) {
			return res.status(404).json({ error: '해당 email이 존재하지 않습니다.' });
		}

		const matchPassword = await bcrypt.compare(password, user.password);

		if (!matchPassword) {
			return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
		}

		const accessToken = jwt.sign({ userId: user.id }, secretKey, {
			expiresIn: '12h',
		});

		res.json({ accessToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 에러' });
	}
});

router.get('/user', authenticateToken, async (req, res) => {
	try {
		const user = await Auth.findByPk(req.locals.user.userId, {
			attributes: { exclude: 'password' },
		});

		if (!user) {
			console.log(req.locals.user.userId);
			return res.status(404).json({ error: '유저를 찾을 수 없습니다.' });
		}

		res.json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: '서버 오류' });
	}
});

//수정
router.put('/user', authenticateToken, imageUploader.single('image'), async (req, res) => {
	console.log("req.body", req.body);
	try {
		const { birthday, address, phoneNumber, name, introduction } = req.body;
		const userId = req.locals.user.userId;
		console.log("req.file", req.file);
		const currentUser = await Auth.findByPk(userId);
		if (currentUser) {

			currentUser.name = name == "" ? currentUser.name : name;
			if (birthday !== "") {
				currentUser.birthday = birthday;
			}
			if (address !== "") {
				currentUser.address = address;
			}
			if (phoneNumber !== "") {
				currentUser.phoneNumber = phoneNumber;
			}
			if (req.file) {
				currentUser.profileImage = req.file.key;
			}
			if (introduction !== "") {
				currentUser.introduction = introduction;
			}
			console.log(currentUser)
			await currentUser.save();

			res.json({ message: '유저정보 수정 완료' });
		} else {
			res.status(404).json({ error: '유저를 찾을 수 없습니다.' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: '서버 에러' });
	}
});

module.exports = router;
