import mongoose, { Schema, Types } from "mongoose";

const BlockSchema = new mongoose.Schema({
  blockId: {
    type: Schema.Types.ObjectId,
    default: function () {
      return new Types.ObjectId();
    },
  },
  userId: {
    type: String,
    required: true,
  },
  blockedId: {
    type: String,
    required: true,
  },
  blockDate: {
    type: Date,
    default: Date.now(),
  },
});

export const Block = mongoose.model("Block", BlockSchema);
