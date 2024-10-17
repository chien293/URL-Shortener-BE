import crypto from "crypto";
import { Url } from "../models";
import UrlRequest from "../controller/dto/UrlRequest";
import { UrlAttributes } from "../models/url";

class UrlService {
  async generateShortUrl(urlRequest: UrlAttributes): Promise<Url> {
    let shortUrl = this.generateHashedShortURL(urlRequest.long_url);
    urlRequest.short_url = shortUrl;
    const url = await Url.create(urlRequest);

    return url;
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
