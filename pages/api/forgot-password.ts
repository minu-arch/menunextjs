import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Criptează noua parolă
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizează parola utilizatorului
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
