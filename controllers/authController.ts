import { Request, Response } from "express";
import hashPassword from "../utils/hashPassword";
import generateJwtToken from "../utils/generateJwtToken";
import comparePassword from "../utils/comparePassword";
import { pool } from "../database";

class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role, country, city, phone_number } =
        req.body;
      const is_admin = role ? role : false;

      // check if user exists
      const candidate = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (candidate.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // hash password
      const hashedPassword = await hashPassword(password);

      // create user
      const newUser = await pool.query(
        "INSERT INTO users (name, email, password, is_admin, country, city, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, email, hashedPassword, is_admin, country, city, phone_number]
      );

      //generate jwt token
      if (newUser.rows.length > 0) {
        const token = generateJwtToken(
          newUser.rows[0].email,
          newUser.rows[0].user_id,
          newUser.rows[0].is_admin
        );
        // set cookie
        return res
          .cookie("auth_token", token, {
            httpOnly: true,
          })
          .status(201)
          .json({ newUser: newUser.rows[0], token });
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message || "Something went in registerFunc Backend",
          file: "authController",
          method: "registerFunc",
        });
      }
    }
  };
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // check if user exists
      const candidate = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (candidate.rows.length === 0) {
        return res.status(400).json({ message: "User does not exist" });
      }
      const {
        email: user_email,
        password: user_password,
        user_id,
        is_admin,
      } = candidate.rows[0];

      // compare password
      const isMatch = await comparePassword(password, user_password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Password or email is incorrect" });
      }

      //generate jwt token
      const token = generateJwtToken(user_email, user_id, is_admin);
      // set cookie
      return res
        .cookie("auth_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message || "Something went in loginFunc Backend",
          file: "authController",
          method: "loginFunc",
        });
      }
    }
  };
}

export const authController = new AuthController();
