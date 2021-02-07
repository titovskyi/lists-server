import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../../entity/Product';

export class UpdateProductController {
    public static put = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status } = req.body;

        await getRepository(Product)
            .createQueryBuilder('product')
            .update(Product)
            .set({ status })
            .where({ id })
            .execute()
            .then(() => {
                res.status(200).send({});
            })
            .catch((err) => {
                res.status(400).send(err + 'UpdateProductController update status error');
            });
    };
}
