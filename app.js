require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productsRouter');
const likeRouter = require('./router/likeRouter')
const tagRouter = require('./router/tagsRouter');
const messageRouter = require('./router/messageRouter')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());

app.use(bodyParser.json());

app.use('/auth', userRouter);
app.use('/', productRouter);
app.use('/', likeRouter);
app.use('/', tagRouter);
app.use('/', messageRouter);
app.listen(port, async () => {
	try {
		console.log(`서버가 열렸습니다. ${port}`);
	} catch (error) {
		console.error('DB 연결 또는 초기화 중에 오류가 발생했습니다.', error);
	}
});
async function testDBConnection() {
    try {
        await db.authenticate();
        console.log('Sequelize로 DB 연결에 성공했습니다.');
    } catch (error) {
        console.error('DB 연결에 실패했습니다.', error);
        throw error;
    }
}

testDBConnection();

