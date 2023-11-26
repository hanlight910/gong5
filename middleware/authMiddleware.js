require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ error: '로그인이 필요합니다.' });
	}

	const token = authHeader.split(' ')[1];

	jwt.verify(token, secretKey, (err, user) => {
		if (err) {
			if (err.name === 'TokenExpiredError') {
				return res
					.status(401)
					.json({ error: '토큰이 유효 기간이 지났습니다.' });
			} else {
				return res.status(401).json({ error: '토큰이 유효하지 않습니다.' });
			}
		}

		req.locals = { user };
		next();
	});

};

module.exports = authenticateMiddleware;
