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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const filters_1 = require("telegraf/filters");
const redisClient_1 = __importDefault(require("./redisClient"));
const bot = new telegraf_1.Composer();
bot.start(ctx => {
    return ctx.reply(`Hello ${ctx.update.message.from.first_name}! Enter your SteamID to subscribe to events connected to your steam acc`);
});
bot.hears(/\d{17}/, ctx => {
    return ctx.reply(`Are you <b>SURE</b> that you want to subscribe to events with SteamID: ${ctx.message.text}`, Object.assign({ parse_mode: "HTML" }, telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback("Yes", `subscribe_to_events:${ctx.message.text}`),
        telegraf_1.Markup.button.callback("NO, it is a mistake", "delete"),
    ])));
});
bot.action("delete", (ctx) => {
    ctx.deleteMessage();
});
bot.action(/subscribe_to_events:(\d{17})/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    ctx.deleteMessage();
    const chatId = yield redisClient_1.default.get(`steamId:${ctx.match[1]}`);
    if (chatId && chatId != `${(_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id}`) {
        ctx.reply("This SteamId is already listened by other chat. You can clear chat subscription in your account");
        return;
    }
    if (chatId == `${(_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id}`) {
        ctx.reply("You alredy subscribed to this Steam account");
        return;
    }
    yield redisClient_1.default.set(`steamId:${ctx.match[1]}`, `${(_c = ctx.chat) === null || _c === void 0 ? void 0 : _c.id}`);
    ctx.reply(`You succesfully subscribed to SteamId: ${ctx.match[1]}!
(Only one Tg user can subscribe to one SteamId) `);
}));
bot.command("show", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, e_1, _e, _f;
    const scanIt = redisClient_1.default.scanIterator({
        TYPE: 'string', // `SCAN` only
        MATCH: 'steamId:*',
        COUNT: 100
    });
    let answr = "";
    try {
        for (var _g = true, scanIt_1 = __asyncValues(scanIt), scanIt_1_1; scanIt_1_1 = yield scanIt_1.next(), _d = scanIt_1_1.done, !_d; _g = true) {
            _f = scanIt_1_1.value;
            _g = false;
            const key = _f;
            // use the key!
            const value = yield redisClient_1.default.get(key);
            answr += `${key}: ${value} \n`;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_g && !_d && (_e = scanIt_1.return)) yield _e.call(scanIt_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    ctx.reply(answr);
}));
bot.on((0, filters_1.message)("text"), ctx => {
    ctx.reply("If you want subscribe your account to your account events, enter SteamId");
});
exports.default = bot;
