import bcryptjs from "bcryptjs";

const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcryptjs.compare(password, hashedPassword);
  return isMatch;
}

export default comparePassword;