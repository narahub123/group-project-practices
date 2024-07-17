import { verfiyRole } from "../helpers/verifyRole";
import { addBlock, deleteBlock, fetchAllBlocks } from "../apis/blocks";
import express from "express";
import { Block } from "../db/blocks";
import mongoose from "mongoose";
import { getNextDay } from "../helpers/date";

export const getBlocksForAdmin = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId, role } = req.user;
  let { sortKey, sortValue, search, keyword } = req.query;

  const key = sortKey ? sortKey.toString() : "blockDate";
  const value = sortValue.toString();

  let result;

  console.log(sortKey, sortValue);
  keyword = keyword.toString() || "userNickname";
  search = search || "";

  console.log(typeof search);

  // 날짜
  const koreanStartDate =
    keyword === "blockDate" && search.length !== 0
      ? search.toString()
      : new Date().toISOString();
  const koreanEndDate = getNextDay(koreanStartDate);

  // 검색
  const match =
    keyword !== "blockDate"
      ? // Block 컬렉션에서 주어진 userId와 일치하는 document를 찾음
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            [keyword]: { $regex: search },
          },
        }
      : {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            $expr: {
              $and: [
                {
                  $gte: [
                    "$blockDate",
                    {
                      $dateFromString: {
                        dateString: koreanStartDate,
                        format: "%Y-%m-%d",
                        timezone: "Asia/Seoul",
                      },
                    },
                  ],
                },
                {
                  $lt: [
                    "$blockDate",
                    {
                      $dateFromString: {
                        dateString: koreanEndDate,
                        format: "%Y-%m-%d",
                        timezone: "Asia/Seoul",
                      },
                    },
                  ],
                },
              ],
            },
          },
        };

  // 페이징
  // pagination
  const limit = Number(req.query.limit);
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  // 관리자 여부 확인
  if (verfiyRole(role)) {
    // 관리자인 경우
    // result = await fetchAllBlocks()
  } else {
    // 사용자인 경우
    try {
      // aggregate
      result = await Block.aggregate([
        // users 컬렉션과 조인하여 userId 필드를 기준으로 currentUser 필드에
        // 매칭된 닉네임 추가
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "userId",
            as: "currentUser",
          },
        },

        // users 컬렉션과 조인하여 userId 필드를 기준으로 blockedUser 필드에
        // 매칭된 닉네임 추가
        {
          $lookup: {
            from: "users",
            localField: "blockedId",
            foreignField: "userId",
            as: "blockedUser",
          },
        },

        // 추가된 currentUser와 blockedUser 필드의 닉네임을
        // 각각 userNickname과 blockedUserNickname 필드로 할당
        {
          $addFields: {
            userNickname: "$currentUser.nickname",
            blockedUserNickname: "$blockedUser.nickname",
          },
        },

        // 검색
        match,

        // 정렬
        {
          $sort: {
            [key]: value === "desc" ? -1 : 1,
          },
        },

        {
          $facet: {
            blocks: [
              {
                $skip: skip,
              },
              {
                $limit: limit,
              },
            ],
            totalBlocks: [{ $count: "count" }],
          },
        },
      ]).exec();
    } catch (error) {
      console.log(error);
    }
  }

  console.log("result", result);

  return res.status(200).json(result);
};

// 차단하기
export const addBlockUserByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  const { userId } = req.user;

  const { blockedId } = req.body;

  // 자기 자신을 차단하려는 경우
  if (userId === blockedId) {
    return res.status(400).json({ code: "1", msg: "SELF_BLOCK" });
  }

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

  return res.status(200).json({ blocks });
};
