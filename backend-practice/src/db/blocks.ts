import mongoose, { Schema, Types } from "mongoose";

const BlockSchema = new mongoose.Schema({
  blockId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  blockedId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  blockDate: {
    type: Date,
    default: Date.now(),
  },
});

BlockSchema.index({ userId: 1, blockedId: 1 }, { unique: true });

export const Block = mongoose.model("Block", BlockSchema);
