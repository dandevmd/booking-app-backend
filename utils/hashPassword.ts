import bcryptjs from "bcryptjs";

const hashedPassword = async (password: string) => {
  const saltedPassword = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, saltedPassword);
  return hashedPassword;
}

export default hashedPassword;