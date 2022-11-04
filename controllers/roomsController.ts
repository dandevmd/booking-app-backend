import { Request, Response, NextFunction } from "express";
import { pool } from "../database";

class RoomsController {
  createRoom = async (req: Request, res: Response, next: NextFunction) => {
    const { title, price, description, max_people, unavailable_dates } =
      req.body;
    const { id: hotels_id } = req.params;
    try {
      const newRoom = await pool.query(
        "INSERT INTO rooms (title, price, description, max_people, unavailable_dates,hotels_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [title, price, description, max_people, unavailable_dates, hotels_id]
      );

      res.status(201).send(newRoom.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
          file: "roomsController.ts",
          method: "createRoom",
        });
      }
    }
  };

  updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    const { id: room_id } = req.params;
    const { title, price, description, max_people, unavailable_dates } =
      req.body;
    try {
      const updateRoom = await pool.query(
        "UPDATE rooms SET title = COALESCE($1, title), price = COALESCE($2, price), description = COALESCE($3, description), max_people = COALESCE($4, max_people), unavailable_dates = COALESCE($5, unavailable_dates) WHERE room_id = $6 RETURNING *",
        [title, price, description, max_people, unavailable_dates, room_id]
      );
      res.status(200).send("Room updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
          file: "roomsController.ts",
          method: "updateRoom",
        });
      }
    }
  };
  deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    const { id: room_id } = req.params;
    try {
      const deleteRoom = await pool.query(
        "DELETE FROM rooms WHERE room_id = $1 RETURNING *",
        [room_id]
      );

      res.status(200).send("Room deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
          file: "roomsController.ts",
          method: "deleteRoom",
        });
      }
    }
  };
  getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get rooms and rooms array from db
      const rooms = await pool.query("SELECT * FROM rooms");
      res.status(200).json(rooms.rows);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
          file: "roomsController.ts",
          method: "getRooms",
        });
      }
    }
  };
  getRoom = async (req: Request, res: Response, next: NextFunction) => {
    const { id: room_id } = req.params;

    try {
      const room = await pool.query("SELECT * FROM rooms WHERE room_id = $1", [
        room_id,
      ]);
      res.status(200).json(room.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
          file: "roomsController.ts",
          method: "getRoom",
        });
      }
    }
  };
}

export const roomsController = new RoomsController();
