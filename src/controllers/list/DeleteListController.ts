import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import List from '../../entity/List';
import Product from '../../entity/Product';

export class DeleteListController {
    public static delete = async (req: Request, res: Response) => {
        const { id } = req.params;

        await DeleteListController.removeProductsFromList(res, id);

        await getRepository(List)
            .createQueryBuilder('list')
            .delete()
            .from(List)
            .where({ id })
            .execute()
            .then(() => {
                res.status(200).send({});
            })
            .catch((err) => {
                res.status(400).send(err + 'DeleteListController delete error');
            });
    };

    private static removeProductsFromList = async (res: Response, listId) => {
        await getRepository(Product)
            .createQueryBuilder('product')
            .delete()
            .from(Product)
            .where({ list: listId })
            .execute()
            .then(() => {
                return;
            })
            .catch((err) => {
                res.status(400).send(err + 'removeProductFromList delete product error');
            });
    };
}
