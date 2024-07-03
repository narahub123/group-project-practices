import { ReportModel } from "../db/reports";

// 신고 등록하기
export const createReportByValue = async (value: Record<string, any>) => {
  console.log(value);

  const report = new ReportModel(value);

  const savedReport = await report.save();

  console.log(savedReport);

  if (savedReport) {
    return { status: "succeed" };
  } else {
    return { status: "rejected" };
  }
};
