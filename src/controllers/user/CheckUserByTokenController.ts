import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../../entity/User';

export class CheckUserByTokenController {
    public static get = async (req: Request, res: Response) => {
        const { phone } = res.locals.jwtPayload;

        await getRepository(User)
            .createQueryBuilder('user')
            .where({ phone })
            .select(['id'])
            .getOne()
            .then(() => {
                res.status(200).send({ isExist: true });
            })
            .catch((err) => {
                res.status(400).send(err + 'CheckUserByTokenController select error');
            });
    };
}
