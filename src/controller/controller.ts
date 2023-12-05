/* eslint-disable no-useless-constructor */

import { Repository } from '../repos/repo.js';
import { NextFunction, Request, Response } from 'express';
import { MediaFiles } from '../services/media.files.js';


export abstract class Controller<T extends { id: unknown }> {
  cloudinaryService: MediaFiles;
  // eslint-disable-next-line no-unused-vars
  constructor(protected repo: Repository<T>) {
    this.cloudinaryService = new MediaFiles()
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const result = await this.repo.create(req.body);
      res.status(201);
      res.statusMessage = 'Created';
      res.json(result);
      } catch (error) {
        next(error);
      }
    }

    async getAll(_req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.repo.getAll();
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
    
    async getById(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.repo.getById(req.params.id);
        res.json(result);
      } catch(error) {
        next(error);
      }
    }

    async update(req: Request, res: Response, next: NextFunction) {
      try {
        const result = await this.repo.update(req.params.id, req.body);
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
}
