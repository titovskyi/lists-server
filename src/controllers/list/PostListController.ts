import { Request, Response } from 'express';

import { List } from '../../entity/List';

import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from '../../entity/User';

export class PostListController {
    // #############################################

    static post = async (req: Request, res: Response) => {
        const { phone } = res.locals.jwtPayload;
        const { phone: sharedPhone, list } = req.body;

        const user: User | void = await getRepository(User)
            .createQueryBuilder('user')
            .where({ phone })
            .leftJoinAndSelect('user.lists', 'lists')
            .select(['user.id'])
            .getOne()
            .catch(() => {
                res.status(400).send('Что-то пошло не так PostListController select user');
            });

        const sharedUser: User | void = await getRepository(User)
            .createQueryBuilder('user')
            .where({ phone: sharedPhone })
            .leftJoinAndSelect('user.lists', 'lists')
            .select(['user.id'])
            .getOne()
            .catch(() => {
                res.status(400).send('Что-то пошло не так PostListController select user');
            });

        if (!list.id) {
            await PostListController.postNewList(res, list, user, sharedUser);
        } else if (list.id) {
            await PostListController.shareList(res, list, sharedUser);
        }
    };

    // #############################################

    private static postNewList = async (res: Response, list: List, user: User | void, sharedUser: User | void) => {
        const newList: List = new List();
        newList.name = list.name;
        newList.users = user && sharedUser ? [user, sharedUser] : null;

        await PostListController.validateAndSaveList(res, newList);
    };

    private static shareList = async (res: Response, list: List, sharedUser: User | void) => {
        const existList: List | void = await getRepository(List)
            .createQueryBuilder('list')
            .where({ id: list.id })
            .select(['user.id'])
            .getOne()
            .catch(() => {
                res.status(400).send('Что-то пошло не так PostListController select list');
            });

        if (sharedUser && existList) {
            for (let i = 0; existList.users.length > i; i++) {
                if (existList.users[i].id === sharedUser.id) {
                    res.status(200).send('Пользователь уже добавлен ShareListController add user list');

                    return;
                }
            }

            existList.users.push(sharedUser);

            await PostListController.validateAndSaveList(res, existList);
        }
    };

    // #############################################

    private static validateAndSaveList = async (res: Response, list: List) => {
        const errors = await validate(list);

        if (errors.length > 0) {
            res.status(400).send(errors);

            return;
        }

        try {
            await getRepository(List).save(list);

            res.status(200).send(list);
        } catch (err) {
            res.status(400).send(err + 'PostListController user && existList');
        }
    };

    // #############################################
}
