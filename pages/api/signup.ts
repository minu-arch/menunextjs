import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    // Validare a datelor
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Verifică dacă e-mailul există deja
      const existingUserQuery =
        await sql`SELECT * FROM Users WHERE email = ${email};`;
      const existingUser = existingUserQuery.rows[0];
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Criptează parola
      const hashedPassword = await bcrypt.hash(password, 10);

      // Creează utilizatorul
      await sql`INSERT INTO Users (firstName, lastName, email, password) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword});`;

      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
