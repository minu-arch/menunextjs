import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, newPassword, confirmPassword } = req.body;

    // Validare a datelor
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
      // Verifică dacă utilizatorul există
      const userQuery = await sql`SELECT * FROM Users WHERE email = ${email};`;
      const user = userQuery.rows[0];
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Criptează noua parolă
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizează parola utilizatorului
      await sql`UPDATE Users SET password = ${hashedPassword} WHERE email = ${email};`;

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error during password reset:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
