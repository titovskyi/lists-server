import { Request, Response } from 'express';
import Product from '../../entity/Product';
import { getRepository, Repository } from 'typeorm';
import List from '../../entity/List';
import User from '../../entity/User';
import { validate } from 'class-validator';
import {PostListController} from "./PostListController";

export class ShareListController {
    static put = async (req: Request, res: Response) => {
        const {phone: sharedPhone, list} = req.body;
        const user: User | void = await getRepository(User)
            .createQueryBuilder()
            .where({phone: sharedPhone})

            .getOne()
            .catch((err) => {
                res.status(400).send('Что-то пошло не так ShareListController select user');
            });

        const existList: List | void = await getRepository(List)
            .createQueryBuilder('list')
            .where({id: list.id})
            .leftJoinAndSelect('list.users', 'users')
            .relation('users')
            .select(['list.id', 'users'])
            .getOne()
            .then((response) => {
                return response;
            })
            .catch(() => {
                res.status(400).send('Что-то пошло не так ShareListController select list');
            });

        if (existList && user) {
            for (let i = 0; existList.users.length > i; i++) {
                if (existList.users[i].id === user.id) {
                    res.status(200).send('Пользователь уже добавлен ShareListController add user list');

                    return;
                }
            }

            existList.users.push(user);

            try {
                await getRepository(List).save(existList);

                res.status(200).send({});
            } catch (err) {
                res.status(400).send(err + 'PostListController save list error');
            }
        } else if (user && !existList) {
            await PostListController.post(req, res);
        } else {
            res.status(400).send('Что-то пошло не так ShareListController add user list');
        }
    };
}
