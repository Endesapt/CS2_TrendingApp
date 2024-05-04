import * as dotenv from "dotenv"
import { Telegraf } from "telegraf";
import botBase from "./bot";
import redisClient from "./redisClient"
import  * as amqp from "amqplib/callback_api";

dotenv.config();
const {BOT_TOKEN}=process.env;
if(!BOT_TOKEN)throw Error("Need BOT_TOKEN in your env!!!");


const bot = new Telegraf(BOT_TOKEN);

bot.use(botBase);

redisClient.connect();
bot.launch();

amqp.connect(process.env.RABBITMQ_HOST!, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = 'event_messages';

    channel.assertQueue(queue, {
      durable: true
    });
    channel.consume(queue, async(msg)=>{
      const message:QueryType=JSON.parse(msg!.content.toString());
      console.log(message);
      var chatId=await redisClient.get(`steamId:${message.userId}`);
      if(!chatId){
        console.log("Cannot find Chat Id for SteamID "+ message.userId);
        return;
      }
      bot.telegram.sendMessage(chatId,`<b>Attention!</b>\n<i>${message.weaponName}</i> is ${message.event} then ${message.eventPrive}$ at current price of ${message.currentPrice}$ !`,{parse_mode:"HTML"});
    }, {
        noAck: true
      });
  });
});


