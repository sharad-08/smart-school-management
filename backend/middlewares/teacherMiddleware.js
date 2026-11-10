import authMiddleware from "./authMiddleware.js";
import requireRole from "./roleMiddleware.js";

export default [authMiddleware, requireRole("teacher")];
