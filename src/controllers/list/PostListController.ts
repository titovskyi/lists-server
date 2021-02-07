import { Request, Response } from 'express';

import { List } from '../../entity/List';

import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { User } from '../../entity/User';

export class PostListController {
    static post = async (req: Request, res: Response) => {
        const { phone } = res.locals.jwtPayload;
        const { name } = req.body;

        const user: User | void = await getRepository(User)
            .createQueryBuilder('user')
            .where({ phone })
            .select(['user.id'])
            .getOne()
            .catch(() => {
                res.status(400).send('Что-то пошло не так PostListController select user');
            });

        const list: List = new List();
        list.name = name;
        list.users = user ? [user] : null;

        const errors = await validate(list);

        if (errors.length > 0) {
            res.status(400).send(errors);

            return;
        }

        try {
            await getRepository(List).save(list);

            res.status(200).send(list);
        } catch (err) {
            res.status(400).send(err + 'PostListController save list error');
        }
    };
}
