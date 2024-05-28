import express from "express";

import {
  getAllPlacesByKeywordNContentTypeId,
  getPlaceByContentId,
} from "../controllers/places";

export default (router: express.Router) => {
  router.get(
    "/places/:areaCode/:contentTypeId/:pageNo",
    getAllPlacesByKeywordNContentTypeId
  );
  router.get("/places/:contentId", getPlaceByContentId);
};
