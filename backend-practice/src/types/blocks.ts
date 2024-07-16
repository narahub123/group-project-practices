import { ObjectId } from "mongoose";

export interface BlockType {
  blockId: ObjectId;
  userId: ObjectId;
  blockedId: ObjectId;
  blockDate: Date;
}
