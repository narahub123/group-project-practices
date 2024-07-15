import mongoose, { ObjectId } from "mongoose";
import { Block } from "../db/blocks";
import { User } from "../db/user";

// 차단 목록 가져오기
export const fetchAllBlocks = (userId?: string) => {
  console.log(userId);

  let blocks;
  // 관리자 여부 확인 코드
  if (userId) {
    blocks = Block.find({ userId })
      .populate("userId", "nickname")
      .populate("blockedId", "nickname");
  } else {
    blocks = Block.find({})
      .populate("userId", "userId nickname")
      .populate("blockedId", "userId nickname");
  }

  return blocks;
};

// 차단하기
export const addBlock = async (userId: string, blockedId: string) => {
  console.log(blockedId);

  const userInfo = await User.findOne({ userId });
  const blockedUserInfo = await User.findOne({ userId: blockedId });

  // console.log("userInfo", userInfo);
  console.log("blockedUserInfo", blockedUserInfo);

  const blockId = new mongoose.Types.ObjectId();
  const value = {
    _id: blockId,
    userId: userInfo,
    blockedId: blockedUserInfo,
    blockId,
  };

  try {
    const block = new Block(value);

    const addBlockUser = await block.save();

    // console.log(addBlockUser);

    return addBlockUser;
  } catch (error) {
    if (error.code === 11000) {
      console.log("이미 차단된 사용자 입니다.");
      return { code: 11000, msg: "중복 에러" };
    } else {
      console.error("사용자 차단 중 에러가 발생");
    }
  }
};

// 차단 해제 하기(삭제)
export const deleteBlock = async (blockId: string) => {
  try {
    const response = await Block.findOneAndDelete({ blockId });

    if (!response) {
      return { code: 500, msg: "에러 발생" };
    } else {
      return { code: 200, msg: "삭제 완료" };
    }
  } catch (error) {
    console.log(error);
  }
};
