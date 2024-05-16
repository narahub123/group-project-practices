import express from "express";
import { getPlacesByKeyAndId, getPlaceById } from "../apis/tourAPI";

export const getAllPlacesByKeywordNContentTypeId = async (
  req: express.Request,
  res: express.Response
) => {
  let { areaCode } = req.params;

  // console.log(areaCode);

  const contentTypeId = "";

  const places = await getPlacesByKeyAndId(areaCode, contentTypeId);

  return res.status(200).json(places);
};

export const getPlaceByContentId = async (
  req: express.Request,
  res: express.Response
) => {
  let { contentId } = req.params;

  const place = await getPlaceById(contentId.toString());

  return res.status(200).json(place);
};
