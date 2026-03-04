import jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authMiddleware(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);

    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
