import { RequestHandler, Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import Field from "../models/Field";

class adminController {
  static postField: RequestHandler = async (req, res, next) => {
    try {
      const { Title, ImageUrl, Status } = req.body as {
        Title: string | undefined;
        ImageUrl: string | undefined;
        Status: string | undefined;
      };

      const field = new Field({ Title, ImageUrl, Status });

      await field.save();
      res.status(201).json(field);
    } catch (error) {
      next(error);
    }
  };

  static getFields: RequestHandler = async (req, res, next) => {
    try {
      const fields = await Field.find();
      res.status(200).json(fields);
    } catch (error) {
      next(error);
    }
  };

  static getField: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const field = await Field.findOne({ _id: new Types.ObjectId(id) });
      res.status(200).json(field);
    } catch (error) {
      next(error);
    }
  };

  static putField = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      const { Title, ImageUrl, Status } = req.body as {
        Title: string | undefined;
        ImageUrl: string | undefined;
        Status: string | undefined;
      };

      const field = new Field({ _id: id, Title, ImageUrl, Status });

      await Field.updateOne({ _id: id }, { Title, ImageUrl, Status });
      res.status(200).json(field);
    } catch (error) {
      next(error);
    }
  };

  static deleteField: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const field = await Field.deleteOne({ _id: new Types.ObjectId(id) });
      res.status(200).json(field);
    } catch (error) {
      next(error);
    }
  };
}

export default adminController;
