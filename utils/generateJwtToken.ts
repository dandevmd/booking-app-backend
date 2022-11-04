import JWT from "jsonwebtoken";

const generateJwtToken = (email: string, user_id: string, role: boolean) => {
  const token = JWT.sign(
    { email, user_id, role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "24h" }
  );
  return token;
};

export default generateJwtToken;
