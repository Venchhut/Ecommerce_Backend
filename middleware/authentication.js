import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function checkRole(roles) {
  return function (req, res, next) {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userRole = decoded.role;
      if (roles.includes(userRole.trim())) {
        req.user = decoded;
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    });
  };
}

function generateToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      address: user.address,
      phone: user.phoneNumber,
      role: user.role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "3d" }
  );
  return token;
}
export { checkRole, generateToken };
