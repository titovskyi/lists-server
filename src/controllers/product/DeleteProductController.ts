import { Request, Response } from 'express';
import List from '../../entity/List';
import { getRepository, Repository } from 'typeorm';
import Product from '../../entity/Product';

export class DeleteProductController {
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;

        await getRepository(Product)
            .createQueryBuilder('product')
            .delete()
            .from(Product)
            .where({ id })
            .execute()
            .then(() => {
                res.status(200).send({});
            })
            .catch((err) => {
                res.status(400).send(err + 'DeleteProductController delete product');
            });
    };
}
