const axios = require("axios");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendTelegram = async (text) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram not configured");
    return;
  }

  try {
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown"
      }
    );
  } catch (err) {
    console.error("TELEGRAM ERROR:", err.message);
  }
};

module.exports = { sendTelegram };
