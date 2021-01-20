import { validate } from "class-validator";
import {Request, Response} from "express";
import {getRepository, Repository} from "typeorm";

import {Product} from "../../entity/Product";

export class PostProductController {
  static post = async(req: Request, res: Response) => {
    const {name, category, listId} = req.body;
    const productRepository: Repository<Product> = getRepository(Product);
    const product: Product = new Product();
    product.name = name;
    product.status = false;
    product.category = category;
    product.list = listId;

    const errors: any = await validate(product);

    if(errors.length > 0) {
      res.status(400).send(errors);

      return;
    }

    try {
      await productRepository.save(product);

      res.status(200).send(product);
    } catch(err) {
      res.status(409).send(err);
    }
  }
}