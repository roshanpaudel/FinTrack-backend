import bcrypt from "bcryptjs";
const saltRound = 15;
export const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, saltRound);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
