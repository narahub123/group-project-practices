import express from "express";
import { getPlacesByKeyAndId, getPlaceById } from "../apis/tourAPI";

export const getAllPlacesByKeywordNContentTypeId = async (
  req: express.Request,
  res: express.Response
) => {
  let { areaCode, contentTypeId } = req.params;

  contentTypeId === "1" ? (contentTypeId = "") : contentTypeId;

  const places = await getPlacesByKeyAndId(areaCode, contentTypeId);

  return res.status(200).json(places);
};

export const getPlaceByContentId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    let { contentId } = req.params;
    const place = await getPlaceById(contentId.toString());

    return res.status(200).json(place);
  } catch (error) {
    console.log(error);
  }
};
