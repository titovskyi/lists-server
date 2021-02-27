import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../entity/User';

export class UpdateUserController {
    static put = async (req: Request, res: Response, user: User) => {
        await getRepository(User)
            .createQueryBuilder()
            .update(User)
            .set({ authToken: user.authToken })
            .where({ phone: user.phone })
            .execute()
            .then(() => {
                res.status(200).send({ authToken: user.authToken });
            })
            .catch(() => {
                res.status(400).send('Что-то пошло не так LoginUserController update');
            });
    };
}
