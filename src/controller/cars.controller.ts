import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Repository } from '../repos/repo.js';
import { Car } from '../entities/car.js';
import { Controller } from './controller.js';
import { HttpError } from '../types/http.error.js';
import { MediaFiles } from '../services/media.files.js';


const debug = createDebug('FP:cars:controller');

export class CarsController extends Controller<Car>{
  declare cloudinaryService: MediaFiles;
  constructor(protected repo: Repository<Car>) {
    super(repo);
    this.cloudinaryService = new MediaFiles();
    debug('Instantiated')
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.author = { id: req.body.userId };
      if (!req.file)
      throw new HttpError(406, 'Not Acceptable', 'Invalid multer file');
      const imgData = await this.cloudinaryService.uploadImage(req.file.path);
      req.body.picture = imgData;
      super.create(req, res, next);
    } catch (error) {
      next(error);
    }
}

async update(req: Request, res: Response, next: NextFunction) {
  try {
    req.body.author = req.body.userId;

    if (req.file) {
      const imgData = await this.cloudinaryService.uploadImage(req.file.path);
      req.body.picture = imgData;
    }

    const result = await this.repo.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      // if (!this.repo) {
      //   throw new Error('Repository is undefined');
      // }

      await this.repo?.delete(req.params.id);
      res.status(204);
      res.statusMessage = 'No Content';
      res.json({});
    } catch (error) {
      next(error);
  }
}
}
