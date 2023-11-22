const express = require('express');
const router = express.Router();

const CommentInfo = require('../models/commentInfo');
const UserInfo = require('../models/userInfo');
const ProductInfo = require('../models/productInfo');


router.post('/comment/:product_id', async (req, res) => { // API comment/:product_id(제품의 PK값)이 필요하지 않은지??
  try {
    // 댓글을 달 제품의 아이디 값
    const product_id = req.params.product_id;

    // 전달해줄 댓글 내용
    const { comment } = req.body;

    // 댓글을 단 제품의 아이디, 전달받은 params값과 일치하는 아이디값을 찾는다.
    const productId = await ProductInfo.findOne({ where: { id : product_id }});

    // 댓글을 단 유저의 아이디
    const userId = await UserInfo.id;

    // db에 comment, 댓글단 유저의 아이디, 제품아이디를 저장한다.
    const addComment = await CommentInfo.create({ comment, product_id: productId, user_id: userId });


    res.status(201).json({ message: '댓글 등록 완료'}); // 썬더에서 보내지는거 확인

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러' });
  }
  
  


})

module.exports = router;