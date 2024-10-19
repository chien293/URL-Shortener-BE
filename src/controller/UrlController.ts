import { Request, Response } from "express";
import { Url } from "../models";
import  UrlService  from "../service/UrlService";
import { BadRequestError, InternalServerError, NotFoundError } from "../error/customError";
import UrlRequest from "./dto/UrlRequest";
import { UrlAttributes } from "../models/url";
import { url } from "inspector";

const urlService = new UrlService();

class UrlController {
  //private urlService: UrlService;

  async generateShortUrl(req: Request, res: Response): Promise<void> {
    const urlRequest : UrlAttributes = req.body as any;

    if (!urlRequest.long_url) {
      throw new BadRequestError("Long URL is required");
    }

    const url = await urlService.generateShortUrl(urlRequest);

    res.json(url);
  }

  async findOriginalUrl(req: Request, res: Response): Promise<void> {
    const shortUrl = req.params.shortUrl;
    const url = await urlService.findOriginalUrl(shortUrl);
console.log(url)
    if (!url) {
      throw new NotFoundError("Short URL not found");
    }

    res.json(url);
  }

  async verifyPassword(req: Request, res: Response): Promise<void> {
    const shortUrl = req.params.shortUrl;
    const body = req.body as any;

    if(!body.password) {
      throw new BadRequestError("Password is required");
    }

    const url = await urlService.verifyPassword(shortUrl, body.password);

    res.json(url);
  }

}

export default UrlController;