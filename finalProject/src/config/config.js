import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV || "development"}`})

export const { NODE_ENV, BASE_PREFIX, MONGO_URL, PERSISTENCE, EMAIL, PSW_EMAIL, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SMS_NUMBER } = process.env