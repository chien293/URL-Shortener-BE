import crypto from "crypto";
import { Url } from "../models";
import UrlRequest from "../controller/dto/UrlRequest";
import { UrlAttributes } from "../models/url";
import {
  BadRequestError,
  ExpiredError,
  NotFoundError,
} from "../error/customError";
import UrlResponse from "../controller/dto/UrlResponse";
import UrlPasswordResponse from "../controller/dto/UrlPasswordResponse";
import bcrypt from "bcrypt";

class UrlService {
  async generateShortUrl(urlRequest: UrlAttributes): Promise<UrlResponse> {
    if (!urlRequest.custom_code) {
      let shortUrl = this.generateHashedShortURL(urlRequest.long_url);
      urlRequest.short_url = shortUrl;
      urlRequest = {...urlRequest, custom_code: undefined}
    }else urlRequest.short_url = urlRequest.custom_code;
    
    if (urlRequest.password) {
      urlRequest.password = bcrypt.hashSync(urlRequest.password, 10);
    }

    const url = await Url.create(urlRequest);
    
    return {
      long_url: url.long_url,
      short_url: url.short_url,
      expiry_date: url.expiry_date,
      custom_code: url.custom_code,
    };
  }

  generateShortUrlWithCustomCode(urlRequest: UrlRequest): string {
    const hashCode = this.generateHashedShortURL(urlRequest.long_url);
    //throw new BadRequestError("Custom code already exists");
    return urlRequest.custom_code + "-" + hashCode;
  }

  async findOriginalUrl(
    shortUrl: string
  ): Promise<UrlResponse | UrlPasswordResponse> {
    const url = await Url.findOne({
      where: {
        short_url: shortUrl,
      },
      attributes: ["long_url", "password", "expiry_date", "custom_code"],
    });

    if (!url) {
      throw new NotFoundError("URL not found");
    }

    const currentDate = new Date();
    if (url.expiry_date && new Date(url.expiry_date) < currentDate) {
      throw new ExpiredError("This URL has been expired");
    }

    if (url.password) {
      return {
        has_password: true,
      };
    }

    const result = {
      long_url: url?.long_url,
      expiry_date: url?.expiry_date,
      custom_code: url?.custom_code,
    };

    return result;
  }

  async verifyPassword(
    shortUrl: string,
    password: string
  ): Promise<UrlResponse> {
    const url = await Url.findOne({
      where: {
        short_url: shortUrl,
      },
      attributes: ["long_url", "password", "expiry_date", "custom_code"],
    });

    if (!url) {
      throw new NotFoundError("URL not found");
    }

    const verified = await bcrypt.compare(password, url.password);

    if (!verified) {
      throw new BadRequestError("Password is incorrect");
    }

    return {
      long_url: url?.long_url,
      expiry_date: url?.expiry_date,
      custom_code: url?.custom_code,
    };
  }

  generateHashedShortURL(longUrl: String) {
    const randomString = crypto.randomBytes(4).toString("hex");
    const hash = crypto
      .createHash("sha256")
      .update(longUrl + randomString)
      .digest("hex");

    return hash.substring(0, 6);
  }
}

export default UrlService;
