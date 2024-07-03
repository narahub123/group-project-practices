import express from "express";
import { createReportByValue } from "../apis/reports";

// 신고 등록하기
export const createReport = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const value = req.body;

    // console.log(value);

    if (!value) {
      return res.sendStatus(403);
    }

    // 중복 검사 필요함

    const report = await createReportByValue(value);

    // console.log(report);

    return res.status(201).json(report);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
