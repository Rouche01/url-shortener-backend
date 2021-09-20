import express, { Request, Response } from "express";
import { validateUrl } from "../utils/validate-url";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import { CustomError } from "../errors/custom-error";
import { Url } from "../models/Url";

dotenv.config();

const router = express.Router();

router.post("/url/shorten", async (req: Request, res: Response) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL as string;
  const isValidBase = await validateUrl(baseUrl);
  const isValidLongUrl = await validateUrl(longUrl);

  if (!isValidBase) {
    throw new CustomError("base url is invalid", 400);
  }

  if (isValidLongUrl) {
    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.status(200).send(url);
    }
    const shortCode = nanoid(7);
    const shortUrl = `${baseUrl}/${shortCode}`;

    const newUrl = Url.build({
      code: shortCode,
      createdDate: Date.now(),
      longUrl,
      shortUrl,
    });

    await newUrl.save();
    res.status(201).send(newUrl);
  } else {
    throw new CustomError("long url is not a valid url", 400);
  }
});

router.get(
  "/url",
  async (req: Request<{}, {}, {}, { limit: number }>, res: Response) => {
    const { limit } = req.query;
    if (isNaN(limit)) {
      throw new CustomError("limit should be a number", 400);
    }
    const urls = await Url.find();
    const sortedUrls = urls.sort((a, b) => b.hits! - a.hits!);
    res.status(200).send(sortedUrls.slice(0, limit));
  }
);

export { router as urlShortenRoute };
