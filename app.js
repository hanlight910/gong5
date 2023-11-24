require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productsRouter');
const likeRouter = require('./router/likeRouter')
const tagRouter = require('./router/tagsRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/auth', userRouter);
app.use('/', productRouter);
app.use('/', likeRouter);
app.use('/', tagRouter);

async function startServer() {
    try {
        await testDBConnection();
        app.listen(port, () => {
            console.log(`서버가 열렸습니다. 포트: ${port}`);
        });
    } catch (error) {
        console.error('DB 연결 또는 초기화 중에 오류가 발생했습니다.', error);
    }
}

async function testDBConnection() {
    try {
        await db.authenticate();
        console.log('Sequelize로 DB 연결에 성공했습니다.');
    } catch (error) {
        console.error('DB 연결에 실패했습니다.', error);
        throw error; // DB 연결에 실패하면 예외를 던져서 서버 구동을 중단합니다.
    }
}

startServer();
