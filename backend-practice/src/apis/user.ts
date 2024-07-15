import mongoose from "mongoose";
import { User } from "../db/user";

export const getUserByUserId = (userId: string) => {
  const user = User.findOne({ userId });

  return user;
};

// 이메일을 통해서 유저 가져오기
export const getUserByEmail = (email: string) => User.findOne({ email });

// 닉네임을 통해서 유저 가져오기
export const getUserByNickname = (nickname: string) =>
  User.findOne({ nickname });

// 회원 가입
export const createUserByEmail = async (value: Record<string, any>) => {
  console.log(value);

  const userId = new mongoose.Types.ObjectId();

  const user = new User({
    ...value,
    userId,
    _id: userId,
  });

  console.log(user);
  try {
    const savedUser = await user.save();

    return savedUser;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (userId?: string) => {
  let users;
  if (userId) {
    users = User.find({ userId });
  } else {
    users = User.find({});
  }

  return users;
};

// 닉네임 가져오기
export const getNickname = async (userId: string) => {
  const user = await User.findOne({ userId });

  const nickname = user.nickname;

  return nickname;
};

// 프로필 업데이트
export const updateUserProfile = (userId: string, value: any) => {
  console.log(value);

  const newUserProfile = User.findOneAndUpdate({ userId }, value);

  return newUserProfile;
};

// 유저 업데이트
export const updateUser = (userId: string, password: string) => {
  const newUserInfo = User.findOneAndUpdate({ userId }, { password });

  return newUserInfo;
};
