import { Block } from "../db/blocks";

// 차단 목록 가져오기
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

// 차단하기
export const addBlock = async (userId: string, blockedId: string) => {
  const value = {
    userId,
    blockedId,
  };

  const block = new Block(value);

  const addBlockUser = await block.save();

  return addBlockUser;
};
