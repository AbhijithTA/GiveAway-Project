import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    MAIL_HOST: process.env.MAIL_HOST as string,
    MAIL_PORT: process.env.MAIL_PORT as string,
    MAIL_USER: process.env.MAIL_USER as string,
    MAIL_PASS: process.env.MAIL_PASS as string
};
