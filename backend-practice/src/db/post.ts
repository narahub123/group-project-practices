import mongoose, { Schema, Types } from "mongoose";

const PostSchema = new mongoose.Schema({
  // 글번호
  postId: {
    type: Schema.Types.ObjectId,
    default: function () {
      return new Types.ObjectId();
    },
  },
  // 일정 아이디
  scheduleId: {
    type: String,
    required: true,
  },
  // 유저 아이디
  userId: {
    type: String,
    required: true,
  },
  // 글제목
  postTitle: {
    type: String,
    required: true,
  },
  // 글내용
  postContent: {
    type: String,
    required: true,
  },
  // 모집 인원
  personnel: {
    type: Number,
    required: true,
  },
  // 글 작성 시기
  postDate: {
    type: Date,
    default: Date.now(),
  },
  // 사진
  postPic: {
    type: String,
    default: "",
  },
  // 모집 상태
  recruitStatus: {
    type: Boolean,
    default: true,
  },
  // 조회수
  viewCount: {
    type: Number,
    default: 0,
  },
  // 노출 상태
  exposureStatus: {
    type: Boolean,
    default: true,
  },
});

export const Post = mongoose.model("Post", PostSchema);
