import asyncHandler from "../utils/async-handler.js";
import ApiError from "../utils/api-error.js";
import { register as registerUser, login as loginUser, getCurrentUser } from "../services/auth.service.js";

function validateRegisterPayload(body) {
  const username = String(body.username || "").trim();
  const email = String(body.email || "").trim();
  const password = String(body.password || "");

  if (!username || username.length < 3) {
    throw new ApiError(400, "Username must be at least 3 characters");
  }
  if (!email || !email.includes("@")) {
    throw new ApiError(400, "Valid email is required");
  }
  if (!password || password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  return { username, email, password };
}

function validateLoginPayload(body) {
  const email = String(body.email || "").trim();
  const password = String(body.password || "");

  if (!email || !email.includes("@")) {
    throw new ApiError(400, "Valid email is required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  return { email, password };
}

const register = asyncHandler(async (req, res) => {
  const payload = validateRegisterPayload(req.body);
  const result = await registerUser(payload);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = asyncHandler(async (req, res) => {
  const payload = validateLoginPayload(req.body);
  const result = await loginUser(payload);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.userId);

  res.status(200).json({
    success: true,
    message: "Current user fetched",
    data: { user },
  });
});

export { register, login, me };
