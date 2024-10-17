import { Request, Router } from "express";
import UrlController from "../controller/UrlController";
import { asyncHandler } from "../middleware/asyncHandler";

export const router = Router();
const urlController = new UrlController();

router.post("/", asyncHandler(urlController.generateShortUrl));