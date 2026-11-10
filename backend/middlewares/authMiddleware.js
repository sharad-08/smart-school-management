import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  if (req.user) return next();

  const token = /^Bearer (\S+)$/i.exec(req.get("Authorization") || "")?.[1];
  if (!token) return res.status(401).json({ message: "Authentication required" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  next();
}
