const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEJoZjk5Lyt2OThRV0pLRFdWL0dJT2pKWHF1aHpHT25TdVpvU2oxWjMwTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2VIWHFZN0dpeVZwWlBURTJ5V09iMlcxMkxnQnFTSFA1K2tKTmY3M2FYUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTlRVQTdyYms3SHVGeXNqMkJic2xoa3FoYlBEcTNncnYyYnJtTHRpUkVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQUVuZmt4dThjQXQxVHdoaUNMdzBBblBWNWVta0NHN2dHK3FoV1pwcWtnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFDSWhaZ0NPOUZ1ZkkwdjZHMnVIYzZaVTFQbWJtMlVPSnA0Y21xbjFlbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNqWGJHSnhPU3FBNzBjemkrWEw4NHlQa0tQdVdob0RwNnVDT1Q1cGNBaXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUpRam9KZVZ0b2xTY1hWTlduVHljOFdJZTF2QlZrTFFSSTRvMFpKYWJXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVzVOT2REUjNlZ2VFWkY4WFgzQ2VMeWtvd0gwYkVlRjk0ZVU5Y2gwdmVTZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQ0UUpaRk5kY3RyajA2VEpBdEgrbWNBeXVBWUpWZmJObk4yZUUxTERZVHNoc1g4TEY4Q21ubnhnYVdOa2JjVXVlMTM4RkZwOG1sbnk0OXFxcFhpNERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ4LCJhZHZTZWNyZXRLZXkiOiJhUkxLaEhTYnpWQnRnQUpndFEyVzJiNGMwZ3BMTHlLOVo1b3Y5Skc1Mm5RPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMbG5xOFpwVFFOQ3gtc2I3TnpCejFnIiwicGhvbmVJZCI6IjlmMzE2YTNiLTc5M2EtNGVlYS1hMGE2LTI5NTEwY2FlYTkxYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwTmJWOTdtN05hWFhFazR1VStyM2xMNnM3Tnc9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJ6cENPdVNkUVEvaFJSNkVCRENVTTFZTjgrdz0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pHUXRnNFF2TFBpdFFZWUFpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhzaWN4Z0owMU8rbFlqQ0ZSS2R2RjhDYXFYczdDUGczbjVjTUJveWZmMUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkpxK1YwQmZrajlPZXNqVEhJcjhla0RvcnpNV0tiS2Mxc25NRXpLcGg5TmEwbGZYaDBOMHNkdEYxY0NES1BCMTlTeFN0MDhoNE1VMmk4S0xaZlAvM0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJQRDg1TXY2VERYRllEZCtiZVlIR004bnQ3U21meFZJenA5aUlySDQ2VkV4dTlrVzF3aEpYMm5zT2hqSzFZRVVOZDh4LzJ2ZkQzbVdMWEtNc3FmOVFBUT09In0sIm1lIjp7ImlkIjoiMjU0NzE3NDA3MzUxOjI3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiODM5NDExOTMxNjcwOTM6MjdAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxNzQwNzM1MToyN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjYkluTVlDZE5UdnBXSXdoVVNuYnhmQW1xbDdPd2o0TjUrWERBYU1uMzlRIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMzNzQwMjUsImxhc3RQcm9wSGFzaCI6IjJGOXl4eiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "WAGWANO",
    NUMERO_OWNER : process.env.OWNER_NUM || "254717407351",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
