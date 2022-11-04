import { Request, Response } from "express";
import { pool } from "../database";

class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await pool.query("SELECT * FROM users");
      res.status(200).json(users.rows);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "userController.ts",
          method: "getAllUsers",
        });
      }
    }
  };
  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        id,
      ]);
      res.status(200).json(user.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "userController.ts",
          method: "getUserById",
        });
      }
    }
  };
  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        password,
        country,
        city,
        user_avatar,
        phone_number,
        is_admin,
      } = req.body;

      //update only the filled fields
      const user = await pool.query(
        "UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), password = COALESCE($3, password), country = COALESCE($4, country), city = COALESCE($5, city), user_avatar = COALESCE($6, user_avatar), phone_number = COALESCE($7, phone_number), is_admin = COALESCE($8, is_admin) WHERE user_id = $9 RETURNING *",
        [
          name,
          email,
          password,
          country,
          city,
          user_avatar,
          phone_number,
          is_admin,
          id,
        ]
      );

      res.status(200).json(user.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "userController.ts",
          method: "updateUser",
        });
      }
    }
  };
  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "userController.ts",
          method: "deleteUser",
        });
      }
    }
  };
}

export const userController = new UserController();
