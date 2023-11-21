require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

const express = require('express');
const router = require(express.Router());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
router.use(express.json());

// 댓글 생성
router.post("/api/comments", async (req, res) => {
  try {
    const { name, content } = req.body;
    if (ss) {

    }
    
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 에러' });
  }

})

// 댓글 조회


// 댓글 수정


// 댓글 삭제


// 댓글 좋아요


// 댓글 좋아요 취소


module.exports = router;