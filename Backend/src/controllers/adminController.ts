import { RequestHandler } from "express";
import { Types } from "mongoose";

import Field from "../models/Field";
import Event from "../models/Event";

class adminController {
  //#region Field CRUD
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

  static putField: RequestHandler = async (req, res, next) => {
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
  //#endregion

  static postEvent: RequestHandler = async (req, res, next) => {
    try {
      const { Title, Date, Place, Address, ImageUrl, Status, Cost } = req.body as {
        Title: string;
        Date: Date;
        Place: Geolocation;
        Address: string;
        ImageUrl: string | undefined;
        Status: string;
        Cost: number | undefined;
      };

      const field = req.body.Field as typeof Field;

      const event = new Event({ Title, field, Date, Place, Address, ImageUrl, Status, Cost });

      await event.save();

      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  };

  static getEvents: RequestHandler = async (req, res, next) => {
    try {
      const events = await Event.find();

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };

  static getEvent: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const event = await Event.findOne({ _id: new Types.ObjectId(id) });

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };

  static putEvent: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const { Title, Date, Place, Address, ImageUrl, Status, Cost } = req.body as {
        Title: string;
        Date: Date;
        Place: Geolocation;
        Address: string;
        ImageUrl: string | undefined;
        Status: string;
        Cost: number | undefined;
      };

      const field = req.body.Field as typeof Field;

      const event = new Event({
        _id: id,
        Title,
        field,
        Date,
        Place,
        Address,
        ImageUrl,
        Status,
        Cost,
      });

      await Event.updateOne(
        { _id: id },
        { Title, field, Date, Place, Address, ImageUrl, Status, Cost }
      );
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };

  static deleteEvent: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const event = await Event.deleteOne({ _id: new Types.ObjectId(id) });

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };
}

export default adminController;
