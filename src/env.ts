import { config } from "dotenv";

config();

export const env = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.APP_SECRET,
  AUTHORIZATION_URL: process.env.AUTHORIZATION_URL,
  APP_SECRET: process.env.APP_SECRET,
} as {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  AUTHORIZATION_URL: string;
  APP_SECRET: string;
};
