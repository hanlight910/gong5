const express = require('express');
const router = express.Router();

const Comment = require('../models/commentModel');

router.post('/comments', async (req, res) => {
  try {
    // 전달해줄 댓글 내용
    const { content } = req.body;

    // db에 content, name, createAt를 저장한다.
    const addComment = await Comment.create({
      content, // 작성한 댓글
      name, // 댓글단 사용자의 이름
    });

    const responseContent = {
      name: addComment.name,
      content: addComment.content,
    }

    // 저장이 완료되면 댓글등록완료 메세지와, db에 저장된 작성자명,댓글내용을 보여준다.
    res.status(201).json({ message: '댓글 등록 완료', comment: addComment });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러' });
  }
  
  


})

module.exports = router;