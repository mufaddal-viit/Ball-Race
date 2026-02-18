import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../config/prisma.js";
import { jwtSecret, jwtExpiresIn } from "../config/env.js";
import ApiError from "../utils/api-error.js";

function sanitizeUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      username: user.username,
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
}

async function register({ username, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email or username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash,
    },
  });

  const token = createToken(user);
  return { user: sanitizeUser(user), token };
}

async function login({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = createToken(user);
  return { user: sanitizeUser(user), token };
}

async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return sanitizeUser(user);
}

export { register, login, getCurrentUser };
