import { Request, Response } from "express";
import { Url } from "../models";
import  UrlService  from "../service/UrlService";
import { BadRequestError, InternalServerError, NotFoundError } from "../error/customError";
import UrlRequest from "./dto/UrlRequest";
import { UrlAttributes } from "../models/url";

const urlService = new UrlService();

class UrlController {
  //private urlService: UrlService;

  async generateShortUrl(req: Request, res: Response): Promise<void> {
    const urlRequest : UrlAttributes = req.query as any;

    if (!urlRequest.long_url) {
      throw new BadRequestError("Long URL is required");
    }

    const url = await urlService.generateShortUrl(urlRequest);

    if (!url) {
      throw new InternalServerError();
    }

    res.json(url);
  }

}

export default UrlController;