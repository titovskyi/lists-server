import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';

export class PostUserController {
    static post = async (req: Request, res: Response, user: User) => {
        await getRepository(User)
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([{ phone: user.phone, authToken: user.authToken }])
            .execute()
            .then(() => {
                res.status(200).send({ authToken: user.authToken });
            })
            .catch(() => {
                res.status(400).send('Что-то пошло не так PostUserController insert');
            });
    };
}
