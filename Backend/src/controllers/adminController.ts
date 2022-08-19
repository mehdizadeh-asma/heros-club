import { NextFunction, Request, RequestHandler, Response } from "express";
import { Types } from "mongoose";

import Field from "../models/Field";

class adminController {
  static postField: RequestHandler = async (req, res, next) => {
    try {
      const title = req.body.Title;
      const imageUrl = req.body.ImageUrl;

      const field = new Field({ Title: title, ImageUrl: imageUrl });
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

  static putField: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const title: string = req.body.Title;
      const imageUrl: string = req.body.ImageUrl;

      const result = await Field.findByIdAndUpdate(id, {Title:title, ImageUrl:imageUrl});
      res.status(200).json(result);
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
