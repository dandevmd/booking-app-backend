import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.auth_token;
  if (!token) {
    res.status(401).send("Access Denied");
    return next();
  }
  try {
    const verified = JWT.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    // @ts-ignore
    if (req.user.user_id == req.params.id || req.user.role) {
      next();
    } else {
      res.status(401).send("ID does not match");
    }
  });
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    //@ts-ignore
    // console.log(req.user)
    // @ts-ignore
    if (req.user.role) {
      next();
    } else {
      res.status(401).send("You are not admin");
    }
  });
}
