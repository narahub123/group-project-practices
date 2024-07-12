import { Block } from "../db/blocks";

export const fetchAllBlocks = async (userId?: string) => {
  let blocks;
  // 관리자 여부 확인 코드
  if (userId) {
    blocks = Block.find({ userId });
  } else {
    blocks = Block.find({});
  }

  return blocks;
};
