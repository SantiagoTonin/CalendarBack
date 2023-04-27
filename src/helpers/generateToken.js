import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  return  jwt.sign(
    {
      userId:user.userId,
      name: user.name,
      email: user.email,
      password: user.password,
      birthdate: user.birthdate,
      nationality: user.nationality,
      age: user.age,
    },
    process.env.JWT_PASSWORD,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

export const verifyToken = async (token)=>{
  try {
    return jwt.verify(token,process.env.JWT_PASSWORD);
  } catch (error) {
    return null
  }
}
