import { verfiyRole } from "../helpers/verifyRole";
import { addBlock, deleteBlock, fetchAllBlocks } from "../apis/blocks";
import express from "express";

export const getBlocksForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId, role } = req.user;
  const { sortKey, sortValue } = req.query;

  const key = sortKey ? sortKey.toString() : "blockDate";
  const value = sortValue.toString();

  let result;

  // 관리자 여부 확인
  if (verfiyRole(role)) {
    result = fetchAllBlocks();
  } else {
    result = fetchAllBlocks(userId);
  }

  // 정렬
  if (value === "desc") {
    result = await result.sort({ [key]: -1 });
  } else {
    result = await result.sort({ [key]: 1 });
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
