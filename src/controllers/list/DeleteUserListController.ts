import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../entity/User';
import List from '../../entity/List';
import { DeleteListController } from './DeleteListController';

export class DeleteUserListController {
    public static delete = async (req: Request, res: Response) => {
        const { phone } = res.locals.jwtPayload;
        const { id } = req.params;
        const listRepository = getRepository(List);

        let list: List = await listRepository
            .createQueryBuilder('list')
            .where({ id })
            .leftJoinAndSelect('list.users', 'users')
            .relation('users')
            .select(['list.id', 'users'])
            .getOne();

        if (list.users.length > 1) {
            list.users = list.users.filter((user) => user.phone !== phone);
        } else {
            await DeleteListController.delete(req, res);

            return;
        }

        try {
            await listRepository.save(list);

            res.status(200).send({});
        } catch (err) {
            res.status(400).send(err + 'DeleteUserListController save list error');
        }
    };
}
