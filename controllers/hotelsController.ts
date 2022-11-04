import express, { Request, Response } from "express";
import { pool } from "../database";

class HotelsController {
  createHotel = async (req: Request, res: Response) => {
    try {
      const {
        name,
        type,
        city,
        address,
        country,
        distance,
        photos,
        description,
        cheapest_price,
        title,
      } = req.body;
      const rating = req.body.rating ? req.body.rating : null;
      const featured = req.body.featured ? req.body.featured : false;
      const newHotel = await pool.query(
        "INSERT INTO hotels (name, type, city, address, country, distance, photos, description, cheapest_price, featured, title, rating) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
        [
          name,
          type,
          city,
          address,
          country,
          distance,
          photos,
          description,
          cheapest_price,
          featured,
          title,
          rating,
        ]
      );

      res.status(201).json(newHotel.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "hotelsController",
          method: "createHotel",
        });
      }
    }
  };
  updateHotel = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        name,
        type,
        city,
        address,
        country,
        distance,
        photos,
        description,
        cheapest_price,
        title,
      } = req.body;
      const rating = req.body.rating ? req.body.rating : null;
      const rooms = req.body.rooms ? req.body.rooms : null;
      const featured = req.body.featured ? req.body.featured : false;
      const updateHotel = await pool.query(
        "UPDATE hotels SET name = $1, type = $2, city = $3, address = $4, country = $5, distance = $6, photos = $7, description = $8, cheapest_price = $9, featured = $10, title = $11, rating = $12, rooms = $13 WHERE hotels_id = $14 RETURNING *",
        [
          name,
          type,
          city,
          address,
          country,
          distance,
          photos,
          description,
          cheapest_price,
          featured,
          title,
          rating,
          rooms,
          id,
        ]
      );
      res.status(200).json(updateHotel.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "hotelsController",
          method: "updateHotel",
        });
      }
    }
  };
  deleteHotel = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleteHotel = await pool.query(
        "DELETE FROM hotels WHERE hotels_id = $1",
        [id]
      );
      res.status(200).json({ message: "Hotel deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "hotelsController",
          method: "deleteHotel",
        });
      }
    }
  };
  getAllHotels = async (req: Request, res: Response) => {
    try {
      const { limit, featured, min, max, ...others } = req.query;
      let allHotels;
      if (min && max && featured && limit) {
         allHotels = await pool.query(
          `SELECT * FROM hotels WHERE featured = $1 AND cheapest_price BETWEEN $2 AND $3 LIMIT $4`,
          [featured, min, max, limit]
        )
      } else {
         allHotels = await pool.query(`SELECT * FROM hotels `)
      }

      res.status(200).json(allHotels.rows);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "hotelsController",
          method: "getAllHotels",
        });
      }
    }
  };
  getHotelById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const hotel = await pool.query(
        "SELECT * FROM hotels WHERE hotels_id = $1",
        [id]
      );
      res.status(200).json(hotel.rows[0]);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "hotelsController",
          method: "getHotelById",
        });
      }
    }
  };
  getHotelsByCity = async (req: Request, res: Response) => {
    const cities: any = req.query.cities;
    const cityArr = cities && cities.split(",");
    console.log(cityArr, ">>>>>>>>>>>>>>>");
    try {
      if (cityArr && cityArr.length > 0) {
        const hotels = await pool.query(
          "SELECT * FROM hotels WHERE city = ANY($1)",
          [cityArr]
        );
        if (hotels.rows.length > 0) {
          //how much hotels are in same city
          const hotelsInCity = hotels.rows.reduce((acc: any, hotel: any) => {
            acc[hotel.city] = acc[hotel.city] ? acc[hotel.city] + 1 : 1;
            return acc;
          }, {});
          return res.status(200).json(hotelsInCity);
        }
      }
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "hotelsController",
          method: "getHotelsByCity",
        });
      }
    }
  };
  getHotelsByType = async (req: Request, res: Response) => {
    const types: any = req.query.types;
    const typeArr = types && types.split(",");
    try {
      if (typeArr && typeArr.length > 0) {
        const hotels = await pool.query(
          "SELECT * FROM hotels WHERE type = ANY($1)",
          [typeArr]
        );
        return res.status(200).json(hotels.rows);
      }
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
          file: "hotelsController",
          method: "getHotelsByType",
        });
      }
    }
  };
}

export const hotelsController = new HotelsController();
