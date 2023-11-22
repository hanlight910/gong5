require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const UserInfo = require('./models/userInfo');
const db = require('./config/database');
const commentInfoRouter = require('./router/comment');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', commentInfoRouter);

app.get('/users', async (req, res) => {
	try {
		// Sequelize 모델을 통해 데이터 가져오기
		const users = await UserInfo.findAll();
		res.json(users);
	} catch (error) {
		console.error('Error fetching data from userInfo table:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.listen(port, async () => {
	try {
		console.log(`서버가 열렸습니다. ${port}`);
	} catch (error) {
		console.error('DB 연결 또는 초기화 중에 오류가 발생했습니다.', error);
	}
});

