import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import process from "node:process";

const app = new Hono();
app.use("*", logger(console.log));

// Ruxsat etilgan URL prefiksi
const ROUTE_PREFIX = "/make-server-a8e38f22";

// CORS nastroykasi
app.use(
  `${ROUTE_PREFIX}/*`,
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "x-client-info", "apikey"],
    allowMethods: ["POST", "GET", "OPTIONS"],
  })
);

app.post(`${ROUTE_PREFIX}/checkout-webhook`, async (c) => {
  try {
    const body = await c.req.json();
    
    // Yuborilgan ma'lumotlarni tekshiramiz
    const { routeId, price, name, phone, paymentMethod, cardNumber } = body;
    
    if (!name || !phone) {
      return c.json({ error: "Ism va telefon raqami kiritilishi shart." }, 400);
    }

    // Telegram bot tokenini environment o'zgaruvchisidan olamiz
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    
    // Sizning shaxsiy Telegram IDingiz
    const CHAT_ID = "8194822872"; 

    if (!telegramBotToken) {
      console.error("TELEGRAM_BOT_TOKEN topilmadi!");
      // Hatto xato bo'lsa ham frontendga 200 qaytarib imitatsiyani davom ettiramiz
      return c.json({ success: true, warning: "Token not found, but proceeding." }, 200);
    }

    const message = `
🛎 *YANGI BRON VA TO'LOV (Demo)*

👤 *Mijoz:* ${name}
📞 *Tel:* ${phone}
🗺 *Marshrut ID:* ${routeId}
💵 *To'lov summasi:* $${price}
💳 *To'lov turi:* ${paymentMethod}
🔒 *Karta (yashirilgan):* ${cardNumber}

_Bu xabar saytdan yuborildi. Kelajakda Payme integratsiyasi to'liq ishlaganda, pul tushishi ham avtomatik qabul qilinadi._`;

    // Telegram API ga so'rov yuborish
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram xatosi:", errorText);
      return c.json({ error: "Telegram ga yuborishda xatolik." }, 500);
    }

    return c.json({ success: true, message: "Successfully sent to Telegram" }, 200);

  } catch (error: any) {
    console.error("Webhook xatosi:", error.message);
    return c.json({ error: "Server xatosi: " + error.message }, 500);
  }
});

// Serverni ishga tushirish
Deno.serve(app.fetch);
