"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const telegraf_1 = require("telegraf");
const bot_1 = __importDefault(require("./bot"));
const redisClient_1 = __importDefault(require("./redisClient"));
const amqp = __importStar(require("amqplib/callback_api"));
dotenv.config();
const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN)
    throw Error("Need BOT_TOKEN in your env!!!");
const bot = new telegraf_1.Telegraf(BOT_TOKEN);
bot.use(bot_1.default);
redisClient_1.default.connect();
bot.launch();
amqp.connect(process.env.RABBITMQ_HOST, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        const queue = 'event_messages';
        channel.assertQueue(queue, {
            durable: true
        });
        channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
            const message = JSON.parse(msg.content.toString());
            console.log(message);
            var chatId = yield redisClient_1.default.get(`steamId:${message.userId}`);
            if (!chatId) {
                console.log("Cannot find Chat Id for SteamID " + message.userId);
                return;
            }
            bot.telegram.sendMessage(chatId, `<b>Attention!</b>\n<i>${message.weapon.name}</i> is ${message.event} then ${message.eventPrive}$ at current price of ${message.currentPrice}$ !`, { parse_mode: "HTML" });
        }), {
            noAck: true
        });
    });
});
