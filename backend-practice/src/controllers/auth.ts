import express from "express";
import {
  createUserByEmail,
  getUserByEmail,
  getUserByNickname,
} from "../apis/user";
import bcryptjs from "bcryptjs";

export const join = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username, nickname, gender, birth } = req.body;

    // 정보를 전부 전달 받았는지 여부 확인
    if (!email || !password || !username || !nickname || !gender || !birth) {
      return res.status(400).json({ code: 3, msg: "Missing required fields" });
    }

    let existingUser = await getUserByEmail(email);

    // 동일 이메일 등록 여부 확인
    if (existingUser) {
      return res.status(400).json({
        code: 1,
        msg: "email is already existed",
      });
    }

    existingUser = await getUserByNickname(nickname);

    // 동일 닉네임 등록 여부 확인
    if (existingUser) {
      return res.status(400).json({
        code: 2,
        msg: "nickname is already existed",
      });
    }

    // 패스워드 해싱하기
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = await createUserByEmail({
      email,
      password: hashedPassword,
      username,
      nickname,
      gender,
      birth,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 1,
      msg: "Internal Error",
    });
  }
};
