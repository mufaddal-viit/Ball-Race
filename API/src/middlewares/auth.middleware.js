import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";
import ApiError from "../utils/api-error.js";

function requireAuth(req, _res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError(401, "Missing or invalid authorization token"));
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
    };
    return next();
  } catch (_error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
}

export { requireAuth };
