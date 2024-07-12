import { verfiyRole } from "../helpers/verifyRole";
import { fetchAllBlocks } from "../apis/blocks";
import express from "express";

export const getBlocksForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId, role } = req.user;
  let blocks;

  // 관리자 여부 확인

  if (verfiyRole(role)) {
    blocks = await fetchAllBlocks();
  } else {
    blocks = await fetchAllBlocks(userId);
  }

  return res.status(200).json(blocks);
};
