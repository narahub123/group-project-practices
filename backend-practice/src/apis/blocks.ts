import { Block } from "../db/blocks";

export const fetchAllBlocks = async () => {
  // 관리자 여부 확인 코드

  const blocks = Block.find({});

  return blocks;
};
