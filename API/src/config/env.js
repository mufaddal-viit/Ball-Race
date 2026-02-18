import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["DATABASE_URL", "JWT_SECRET"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const port = Number(process.env.PORT || 5000);
export const databaseUrl = process.env.DATABASE_URL;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";
