import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const userId = Array.isArray(req.query.id)
        ? req.query.id[0]
        : req.query.id;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const userQuery = await sql`SELECT * FROM users WHERE id = ${userId};`;
      const user = userQuery.rows[0];

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
