import {Request, Response} from "express";
import {getRepository, Repository} from "typeorm";
import {Product} from "../../entity/Product";

export class GetProductsController {
  static get = async(req: Request, res: Response) => {

    const productRepository: Repository<Product> = getRepository(Product);
    const products: Product[] = await productRepository.find({
      select: ["id", "name", "category", "status"]
    });

    res.send(products);
  }
}