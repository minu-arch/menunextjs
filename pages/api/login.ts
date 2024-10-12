import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Validare a datelor
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Verifică dacă utilizatorul există
      const userQuery = await sql`SELECT * FROM Users WHERE email = ${email};`;
      const user = userQuery.rows[0]; // Obține primul utilizator din rezultat

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Verifică parola
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Autentificare reușită
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error during login:", error); // Adaugă logare pentru debugging
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
