"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var urlSchema = new mongoose_1.default.Schema({
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
}, {
    toJSON: {
        versionKey: false,
        transform: function (_, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
urlSchema.statics.build = function (attrs) {
    return new Url(attrs);
};
var Url = mongoose_1.default.model("Url", urlSchema);
exports.Url = Url;
