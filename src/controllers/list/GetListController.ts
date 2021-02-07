import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import List from '../../entity/List';

export class GetListController {
    static get = async (req: Request, res: Response) => {
        const { id } = req.params;

        await getRepository(List)
            .createQueryBuilder('list')
            .where({ id })
            .leftJoinAndSelect('list.users', 'users')
            .leftJoinAndSelect('list.products', 'products')
            .select(['list.id', 'list.name', 'list.updateAt', 'users', 'products'])
            .getOne()
            .then((list) => {
                res.status(200).send(list);
            })
            .catch((err) => {
                res.status(400).send('Что-то пошло не так GetListController select');
            });
    };
}
