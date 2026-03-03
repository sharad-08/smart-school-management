
import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
    
  console.log("HEADERS:", req.headers);

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("No Authorization header");
    return res.status(401).json({ message: "No token" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.log("Authorization format wrong:", authHeader);
    return res.status(401).json({ message: "Wrong format" });
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN RECEIVED:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: error.message });
  }
};

export default authMiddleware;