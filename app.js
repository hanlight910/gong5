require('dotenv').config();

const express = require("express");
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000
const db = require('./config/database');
const commentRouter = require('./router/comment.js');

app.use(bodyParser.json());
app.use('/', commentRouter);

// app.use('/auth', authRouter);
// app.use('/', productRouter);

app.listen(port, () => {
	console.log(`서버가 열렸습니다. ${port}`);
});

async function testDBConnection() {
	try {
		await db.authenticate();
		console.log('Sequelize로 DB 연결에 성공했습니다.');
	} catch (error) {
		console.error('DB 연결에 실패했습니다.', error);
	}
}

testDBConnection();