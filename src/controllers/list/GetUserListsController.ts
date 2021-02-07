import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../entity/User';

export class GetUserListsController {
    public static get = async (req: Request, res: Response) => {
        const { phone } = res.locals.jwtPayload;

        await getRepository(User)
            .createQueryBuilder('user')
            .where({ phone })
            .leftJoinAndSelect('user.lists', 'lists')
            .select(['user.id', 'lists'])
            .orderBy('lists.updateAt', 'DESC')
            .getOne()
            .then((user) => {
                res.status(200).send(user);
            })
            .catch(() => {
                res.status(400).send('Что-то пошло не так GetUserListsController select');
            });
    };
}
