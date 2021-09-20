import mongoose from "mongoose";

interface UrlAttrs {
  longUrl: string;
  shortUrl: string;
  code: string;
  createdDate: number;
  hits?: number;
}

interface UrlDoc extends mongoose.Document {
  longUrl: string;
  shortUrl: string;
  code: string;
  createdDate: number;
  hits?: number;
}

interface UrlModel extends mongoose.Model<UrlAttrs> {
  build(attrs: UrlAttrs): UrlDoc;
}

const urlSchema = new mongoose.Schema<UrlAttrs>(
  {
    longUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    hits: {
      type: Number,
      default: 0,
    },
    createdDate: {
      type: Number,
      default: Date.now,
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform: (_, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

urlSchema.statics.build = (attrs: UrlAttrs) => {
  return new Url(attrs);
};

const Url = mongoose.model<UrlAttrs, UrlModel>("Url", urlSchema);

export { Url };
