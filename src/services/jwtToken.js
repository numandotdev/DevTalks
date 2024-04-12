import jwt from "jsonwebtoken";

export const generateJwtToken = (email) => {
  let token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
