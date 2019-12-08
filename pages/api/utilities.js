import dotenv from 'dotenv'
dotenv.config()

const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;


export const gmailSettings = {
  service: 'gmail',
  auth: {
    user: GMAIL_ADDRESS,
    pass: GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  }
}

export const emailAddress = GMAIL_ADDRESS || process.env.EMAIL_USER

export const MAILTRAP = {
  USER: process.env.MAILTRAP_USER,
  PASS: process.env.MAILTRAP_PASS
}