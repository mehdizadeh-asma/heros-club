import { NextFunction, Request, RequestHandler, Response } from "express";
import { Types } from "mongoose";

import Field from "../models/Field";
import Event from "../models/Event";

class adminController {
  //#region Field CRUD
  static postField = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { Title, ImageUrl, Status } = req.body as {
        Title: string | undefined;
        ImageUrl: string | undefined;
        Status: string | undefined;
      };

      const field = new Field({ Title, ImageUrl, Status });

      await field.validate();

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

      if (!field) throw new Error("Field not found!");

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

      const error = field.validateSync();

      if (error) throw new Error(error.message);

      await Field.updateOne({ _id: id }, { Title, ImageUrl, Status });
      res.status(200).json(field);
    } catch (error) {
      next(error);
    }
  };

  static deleteField: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const result = await Field.deleteOne({ _id: new Types.ObjectId(id) });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  //#endregion

  //#region Event CRUD
  static postEvent: RequestHandler = async (req, res, next) => {
    try {
      const { Title, EventDate, Address, ImageUrl, Status, PaymentType, Cost, FieldId } =
        req.body as {
          Title: string;
          EventDate: Date;
          Address: string;
          ImageUrl: string | undefined;
          Status: string;
          PaymentType: string;
          Cost: number | undefined;
          FieldId: string | undefined;
          // Place: typeof Event.prototype.Place | undefined;
        };

      // const error = field.validateSync();

      // if (error) throw new Error(error.message);

      const event = new Event({
        Title,
        EventDate,
        Address,
        ImageUrl,
        Status,
        PaymentType,
        Cost,
        Field: new Types.ObjectId(FieldId),
        // Place,
      });

      await event.save();

      const result = await Event.findById(event._id).populate("Field");

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  static getEvents: RequestHandler = async (req, res, next) => {
    try {
      const events = await Event.find().populate("Field");

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };

  static getEvent: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const event = await Event.findOne({ _id: new Types.ObjectId(id) });

      if (!event) throw new Error("Field not found!");

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };

  static putEvent: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const { Title, Date, Place, Address, ImageUrl, Status, PaymentType, Cost } = req.body as {
        Title: string;
        Date: Date;
        Place: Geolocation;
        Address: string;
        ImageUrl: string | undefined;
        Status: string;
        PaymentType: string;
        Cost: number | undefined;
      };

      const field = Field.hydrate(req.body.Field);

      let error = field.validateSync();

      if (error) throw new Error(error.message);

      const event = new Event({
        _id: id,
        Title,
        field,
        Date,
        Place,
        Address,
        ImageUrl,
        Status,
        PaymentType,
        Cost,
      });

      error = event.validateSync();

      if (error) throw new Error(error.message);

      await Event.updateOne(
        { _id: id },
        { Title, field, Date, Place, Address, ImageUrl, Status, PaymentType, Cost }
      );
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };

  static deleteEvent: RequestHandler = async (req, res, next) => {
    try {
      const id: string = req.params.id;

      const result = await Event.deleteOne({ _id: new Types.ObjectId(id) });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  //#endregion
}

export default adminController;
