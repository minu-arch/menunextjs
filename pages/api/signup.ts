import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import winston from "winston";

// Configurare logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.File({ filename: "signup.log" })],
});

// Funcție simplă de validare email
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    // Logging pentru cererea primită
    logger.info("Signup request received", { email });

    // Validare a datelor
    if (!firstName || !lastName || !email || !password) {
      logger.warn("Missing required fields in signup attempt", { email });
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!isValidEmail(email)) {
      logger.warn("Invalid email format in signup attempt", { email });
      return res.status(400).json({ error: "Invalid email format" });
    }

    try {
      // Verifică dacă e-mailul există deja
      const existingUserQuery =
        await sql`SELECT * FROM Users WHERE email = ${email};`;
      const existingUser = existingUserQuery.rows[0];
      if (existingUser) {
        logger.warn("Signup attempt with existing email", { email });
        return res.status(400).json({ error: "Email already exists" });
      }

      // Criptează parola
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creează utilizatorul
      await sql`INSERT INTO Users (firstName, lastName, email, password) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword});`;

      logger.info("New user created successfully", { email });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      logger.error("Error creating user", {
        email,
        error: (error as Error).message,
      });
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    logger.warn("Invalid method for signup endpoint", { method: req.method });
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
