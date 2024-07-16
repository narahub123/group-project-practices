import { verfiyRole } from "../helpers/verifyRole";
import { addBlock, deleteBlock, fetchAllBlocks } from "../apis/blocks";
import express from "express";

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
    result = await fetchAllBlocks()
      .populate({
        path: "userId",
        select: "nickname",
        // options: { sort: { key: value === "desc" ? -1 : 1 } },
      })
      .populate({
        path: "blockedId",
        select: "nickname",
        // options: { sort: { key: value === "desc" ? -1 : 1 } },
      })
      .sort({
        [key]: value === "desc" ? -1 : 1,
      } as any);
  } else {
    // 사용자인 경우
    // 유저 아이디를 추가해서 해당 아이디를 가진 목록만 반환
    result = await fetchAllBlocks(userId)
      .populate({
        path: "userId",
        select: "nickname",
        options: { sort: { key: value === "desc" ? -1 : 1 } },
      })
      .populate({
        path: "blockedId",
        select: "nickname",
        options: { sort: { key: value === "desc" ? -1 : 1 } },
      })
      .sort({
        [key]: value === "desc" ? -1 : 1,
      } as any);
  }

  let blocks = result;

  console.log(blocks);

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
