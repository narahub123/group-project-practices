import { fetchAllBlocks } from "../apis/blocks";
import express from "express";

export const getBlocksForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  // 관리자 여부 확인

  const blocks = await fetchAllBlocks();

  return res.status(200).json(blocks);
};
