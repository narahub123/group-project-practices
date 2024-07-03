import { ReportModel } from "../db/reports";

// 신고 등록하기
export const createReportByValue = async (value: Record<string, any>) => {
  console.log(value);

  const report = new ReportModel(value);

  const savedReport = await report.save();

  if (savedReport) {
    return { status: "succeed" };
  } else {
    return { status: "rejected" };
  }
};

// 신고 목록
export const getReportsById = async (userId: number) => {
  return ReportModel.find({ userId });
};
