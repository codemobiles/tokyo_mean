import { NextFunction, Request, Response } from 'express';
import { cloneProduct, Products } from '../entity/Products';
import { AppDataSource } from '../data-source';
import * as formidable from 'formidable';
const log = require('simple-node-logger').createSimpleLogger('project.log');

import {
  deleteFile,
  generateSeq,
  getFileName,
  uploadImage,
} from '../utils/cm-util';

export class ProductController {
  private productRepo = AppDataSource.getMongoRepository(Products);

  async add(req: Request, res: Response, next: NextFunction) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields: any, files) => {
      if (error) {
        res.json({ result: 'nok', error });
        return;
      }

      const newProduct = new Products();
      newProduct.product_id = await generateSeq('product_id');
      newProduct.name = fields.name;
      newProduct.stock = Number(fields.stock);
      newProduct.price = Number(fields.price);

      let doc: Products = await this.productRepo.save(newProduct);
      const fileName = getFileName(files, doc.product_id.toString());
      await uploadImage(files, fileName);
      await this.productRepo.update({ _id: doc._id }, { image: fileName });
      res.json({ result: 'ok', message: { ...doc, image: fileName } });
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields: any, files) => {
      const fileName = getFileName(files, fields.id);
      if (fileName) {
        fields.image = fileName;
        await uploadImage(files, fileName);
      }

      await this.productRepo.findOneAndUpdate(
        { product_id: Number(fields.id) },
        {
          $set: cloneProduct(fields),
        },
        { upsert: false } // create if not exist
      );

      res.json({ result: 'ok' });
    });
  }

  async all(req: Request, res: Response, next: NextFunction) {
    return this.productRepo.find({ order: { created: 'DESC' } });
  }

  async allLike(req: Request, res: Response, next: NextFunction) {
    log.info(req.params.name);
    return this.productRepo.findBy({
      name: new RegExp('^.*' + req.params.name + '.*$', 'i'),
    });
  }

  async one(req, res: Response, next: NextFunction) {
    return this.productRepo.findOne({
      where: {
        product_id: Number(req.params.product_id),
      },
    });
  }

  async save(req: Request, res: Response, next: NextFunction) {
    return this.productRepo.save(req.body);
  }

  async remove(req, res: Response, next: NextFunction) {
    await this.productRepo.findOneAndDelete({
      product_id: Number(req.params.product_id),
    });
    await deleteFile(req.params.product_id.toString());
    return { result: 'ok' };
  }
}
