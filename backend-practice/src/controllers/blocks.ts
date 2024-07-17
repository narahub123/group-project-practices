import { verfiyRole } from "../helpers/verifyRole";
import { addBlock, deleteBlock, fetchAllBlocks } from "../apis/blocks";
import express from "express";
import { Block } from "../db/blocks";
import mongoose from "mongoose";

interface QueryObject {
  [key: string]: any;
}

export const getBlocksForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId, role } = req.user;
  const { sortKey, sortValue, search, keyword } = req.query;

  const key = sortKey ? sortKey.toString() : "blockDate";
  const value = sortValue.toString();

  let result;

  console.log(sortKey, sortValue);

  // 관리자 여부 확인
  if (verfiyRole(role)) {
    // 관리자인 경우
    // result = await fetchAllBlocks()
    //   .populate({
    //     path: "userId",
    //     select: "nickname",
    //     // options: { sort: { key: value === "desc" ? -1 : 1 } },
    //   })
    //   .populate({
    //     path: "blockedId",
    //     select: "nickname",
    //     // options: { sort: { key: value === "desc" ? -1 : 1 } },
    //   });
  } else {
    // 사용자인 경우
    // 유저 아이디를 추가해서 해당 아이디를 가진 목록만 반환
    // result = fetchAllBlocks(userId)
    //   .populate({
    //     path: "userId",
    //     select: "nickname",
    //   })
    //   .populate({
    //     path: "blockedId",
    //     select: "nickname",
    //   });
    try {
      // aggregate
      result = await Block.aggregate([
        // Block 컬렉션에서 주어진 userId와 일치하는 document를 찾음
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },

        // users 컬렉션과 조인하여 userId 필드를 기준으로 currentUser 필드에
        // 매칭된 닉네임 추가
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "userId",
            as: "currentUser",
          },
        },

        // users 컬렉션과 조인하여 userId 필드를 기준으로 blockedUser 필드에
        // 매칭된 닉네임 추가
        {
          $lookup: {
            from: "users",
            localField: "blockedId",
            foreignField: "userId",
            as: "blockedUser",
          },
        },

        // 추가된 currentUser와 blockedUser 필드의 닉네임을
        // 각각 userNickname과 blockedUserNickname 필드로 할당
        {
          $addFields: {
            userNickname: "$currentUser.nickname",
            blockedUserNickname: "$blockedUser.nickname",
          },
        },
      ]).exec();
    } catch (error) {
      console.log(error);
    }
  }

  console.log("result1", result);
  console.log("key", key);

  // result = await result.sort({
  //   "blockedId.nickname": 1,
  // } as any);

  // console.log("result2", result);

  let blocks = result;

  return res.status(200).json(blocks);
};

// 차단하기
export const addBlockUserByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId } = req.user;

  const { blockedId } = req.body;

  const block = await addBlock(userId, blockedId);

  return res.status(400).json(block);
};

// 차단 해제 하기
export const deleteBlockedUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId } = req.user;
  const { blockId } = req.body;

  let blocks;

  const result = await deleteBlock(blockId);

  if (result.code === 200) {
    // 사용자인 경우
    if (userId) {
      blocks = await fetchAllBlocks(userId);

      // 관리자인 경우
    } else {
      blocks = await fetchAllBlocks();
    }
  } else {
    console.log("에러 발생");
  }

  return res.status(200).json({ blocks });
};
