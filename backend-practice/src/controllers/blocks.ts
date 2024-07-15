import { verfiyRole } from "../helpers/verifyRole";
import { addBlock, deleteBlock, fetchAllBlocks } from "../apis/blocks";
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

  console.log("blocks", blocks);

  return res.status(200).json({ blocks });
};
