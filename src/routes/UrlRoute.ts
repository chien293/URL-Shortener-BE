import { Request, Router } from "express";
import UrlController from "../controller/UrlController";
import { asyncHandler } from "../middleware/asyncHandler";

export const router = Router();
const urlController = new UrlController();

router.post("/custom-code", urlController.generateShortUrlWithCustomCode);

router.post("/", asyncHandler(urlController.generateShortUrl));

router.get("/:shortUrl", asyncHandler(urlController.findOriginalUrl));

router.post("/:shortUrl", asyncHandler(urlController.verifyPassword));
