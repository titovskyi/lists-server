import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Product } from '../../entity/Product';
import List from '../../entity/List';

export class PostProductToListController {
    public static post = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { products } = req.body;
        const listRepository = getRepository(List);
        const list: List | void = await listRepository
            .createQueryBuilder('list')
            .where({ id })
            .leftJoinAndSelect('list.products', 'products')
            .relation('products')
            .select(['list.id', 'products'])
            .getOne()
            .catch(() => {
                res.status(400).send('Что-то пошло не так PostProductToListController select list');
            });

        if (list) {
            for (let i = 0; products.length > i; i++) {
                const product = await PostProductToListController.createProduct(products[i].name, products[i].category);

                list.products.push(product);
            }

            try {
                await listRepository.save(list);
            } catch (err) {
                res.status(400).send(err + 'PostProductToListController save error');
            }

            res.status(200).send(list);
        } else {
            res.status(400).send('PostProductToListController list not found error');
        }
    };

    private static createProduct = async (name: string, category: string) => {
        const product: Product = new Product();
        product.name = name;
        product.category = category;
        product.status = false;
        await getRepository(Product).save(product);

        return product;
    };
}
