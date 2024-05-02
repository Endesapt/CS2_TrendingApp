import { Composer, Markup } from "telegraf"
import {message} from "telegraf/filters"

import redisClient from "./redisClient"
const bot=new Composer();

bot.start(ctx => {
  return ctx.reply(`Hello ${ctx.update.message.from.first_name}! Enter your SteamID to subscribe to events connected to your steam acc`);
});
bot.hears(/\d{17}/, ctx => {
	return ctx.reply(`Are you <b>SURE</b> that you want to subscribe to events with SteamID: ${ctx.message.text}`, {
		parse_mode: "HTML",
		...Markup.inlineKeyboard([
			Markup.button.callback("Yes", `subscribe_to_events:${ctx.message.text}`),
			Markup.button.callback("NO, it is a mistake", "delete"),
		]),
	});
});
bot.action("delete",(ctx)=>{
  ctx.deleteMessage();
})
bot.action(/subscribe_to_events:(\d{17})/,async (ctx)=>{
  ctx.deleteMessage();

  const chatId = await redisClient.get(`steamId:${ctx.match[1]}`);
  if(chatId && chatId!=`${ctx.chat?.id}`){
    
    ctx.reply("This SteamId is already listened by other chat. You can clear chat subscription in your account");
    return;
  }
  if( chatId==`${ctx.chat?.id}`){
    ctx.reply("You alredy subscribed to this Steam account");
    return;
  }


  await redisClient.set(`steamId:${ctx.match[1]}`,`${ctx.chat?.id}`);
  ctx.reply(`You succesfully subscribed to SteamId: ${ctx.match[1]}!
(Only one Tg user can subscribe to one SteamId) `);
})

bot.command("show",async (ctx)=>{
    const scanIt=redisClient.scanIterator({
        TYPE: 'string', // `SCAN` only
        MATCH: 'steamId:*',
        COUNT: 100
      });
    let answr:string="";
    for await (const key of scanIt) {
        // use the key!
        const value=await redisClient.get(key);
        answr+=`${key}: ${value} \n`;
    }
    ctx.reply(answr);
})

bot.on(message("text"),ctx=>{
    ctx.reply("If you want subscribe your account to your account events, enter SteamId")
  })
export default bot;