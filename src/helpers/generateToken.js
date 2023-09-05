import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  return  jwt.sign(
    {
      userId:user.userId,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      birthdate: user.birthdate,
      nationality: user.nationality,
      rol: user.rol,
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
