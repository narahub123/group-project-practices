import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.TOUR_API_KEY;

export const getPlacesByKeyAndId = async (
  areaCode: string,
  contentTypeId: string
) => {
  // 변경 가능한 파라미터들
  const pageNo = 1;
  const numOfRows = 8;

  contentTypeId === "1" ? "" : contentTypeId;

  const apiUrl = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&MobileApp=AppTest&MobileOS=ETC&arrange=A&areaCode=${areaCode}&contentTypeId=${contentTypeId}&_type=JSON`;

  console.log(apiUrl);

  try {
    const res = await axios.get(apiUrl);
    return res.data.response.body.items.item;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getPlaceById = async (contentId: string) => {
  // 변경 가능한 파라미터들
  const pageNo = 1;
  const numOfRows = 10;

  const apiUrl = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&MobileApp=AppTest&MobileOS=ETC&contentId=${contentId}&_type=json&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&pageNo=${pageNo}&numOfRows=${numOfRows}`;
  try {
    const res = await axios.get(apiUrl);

    console.log(res.data.response.body.items.item);

    return res.data.response.body.items.item;
  } catch (error) {
    console.log(error);
  }
};