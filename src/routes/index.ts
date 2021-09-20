import express, { Request, Response } from "express";
import { CustomError } from "../errors/custom-error";
import { Url } from "../models/Url";

const router = express.Router();

router.get(
  "/:shortCode",
  async (req: Request<{ shortCode: string }, {}, {}>, res: Response) => {
    const code = req.params.shortCode;
    const url = await Url.findOne({ code });

    if (!url) {
      throw new CustomError("url not found", 404);
    }

    await Url.findOneAndUpdate({ code }, { $inc: { hits: 1 } });
    res.redirect(url.longUrl);
  }
);

export { router as redirectRouter };
