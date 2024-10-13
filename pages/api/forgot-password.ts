import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import winston from "winston";

// Configurare logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.File({ filename: "password-reset.log" })],
});

// Configurare rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 5, // Limită de 5 cereri per fereastră per IP
  message: {
    error: "Too many password reset attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Aplicare rate limiting
  await new Promise((resolve) => limiter(req, res, resolve));

  if (req.method === "POST") {
    const { email, newPassword, confirmPassword } = req.body;

    // Logging pentru cererea primită
    logger.info("Password reset request received", { email });

    // Validare a datelor
    if (!email || !newPassword || !confirmPassword) {
      logger.warn("Missing required fields in password reset request", {
        email,
      });
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (newPassword !== confirmPassword) {
      logger.warn("Passwords do not match in reset request", { email });
      return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
      // Verifică dacă utilizatorul există
      const userQuery = await sql`SELECT * FROM Users WHERE email = ${email};`;
      const user = userQuery.rows[0];
      if (!user) {
        logger.warn("User not found for password reset", { email });
        return res.status(404).json({ error: "User not found" });
      }

      // Criptează noua parolă
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizează parola utilizatorului
      await sql`UPDATE Users SET password = ${hashedPassword} WHERE email = ${email};`;

      logger.info("Password changed successfully", { email });
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      logger.error("Error during password reset", {
        email,
        error: (error as Error).message,
      });
      console.error("Error during password reset:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    logger.warn("Invalid method for password reset", { method: req.method });
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
