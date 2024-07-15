import { verfiyRole } from "../helpers/verifyRole";
import { addBlock, fetchAllBlocks } from "../apis/blocks";
import express from "express";

export const getBlocksForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId, role } = req.user;
  let blocks;

  console.log(role);

  // 관리자 여부 확인
  if (verfiyRole(role)) {
    blocks = await fetchAllBlocks();
  } else {
    blocks = await fetchAllBlocks(userId);
  }

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

  return res.status(500).json(block);
};
