"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlShortenRoute = void 0;
var express_1 = __importDefault(require("express"));
var validate_url_1 = require("../utils/validate-url");
var nanoid_1 = require("nanoid");
var dotenv_1 = __importDefault(require("dotenv"));
var custom_error_1 = require("../errors/custom-error");
var Url_1 = require("../models/Url");
dotenv_1.default.config();
var router = express_1.default.Router();
exports.urlShortenRoute = router;
router.post("/url/shorten", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var longUrl, baseUrl, isValidBase, isValidLongUrl, url, shortCode, shortUrl, newUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                longUrl = req.body.longUrl;
                baseUrl = process.env.BASE_URL;
                return [4 /*yield*/, validate_url_1.validateUrl(baseUrl)];
            case 1:
                isValidBase = _a.sent();
                return [4 /*yield*/, validate_url_1.validateUrl(longUrl)];
            case 2:
                isValidLongUrl = _a.sent();
                if (!isValidBase) {
                    throw new custom_error_1.CustomError("base url is invalid", 400);
                }
                if (!isValidLongUrl) return [3 /*break*/, 5];
                return [4 /*yield*/, Url_1.Url.findOne({ longUrl: longUrl })];
            case 3:
                url = _a.sent();
                if (url) {
                    return [2 /*return*/, res.status(200).send(url)];
                }
                shortCode = nanoid_1.nanoid(7);
                shortUrl = baseUrl + "/" + shortCode;
                newUrl = Url_1.Url.build({
                    code: shortCode,
                    createdDate: Date.now(),
                    longUrl: longUrl,
                    shortUrl: shortUrl,
                });
                return [4 /*yield*/, newUrl.save()];
            case 4:
                _a.sent();
                res.status(200).send(newUrl);
                return [3 /*break*/, 6];
            case 5: throw new custom_error_1.CustomError("long url is not a valid url", 400);
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get("/url", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, urls, sortedUrls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = req.query.limit;
                if (isNaN(limit)) {
                    throw new custom_error_1.CustomError("limit should be a number", 400);
                }
                return [4 /*yield*/, Url_1.Url.find()];
            case 1:
                urls = _a.sent();
                sortedUrls = urls.sort(function (a, b) { return b.hits - a.hits; });
                res.status(200).send(sortedUrls.slice(0, limit));
                return [2 /*return*/];
        }
    });
}); });
