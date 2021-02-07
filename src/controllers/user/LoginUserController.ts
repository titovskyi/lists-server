import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

import { User } from '../../entity/User';
import { PostUserController } from './PostUserController';
import { UpdateUserController } from './UpdateUserController';
import * as jwt from 'jsonwebtoken';
import config from '../../config/config';
import { validate } from 'class-validator';

export class LoginUserController {
    public static post = async (req: Request, res: Response) => {
        const { phone } = req.body;
        const authToken = jwt.sign({ phone }, config.jwtSecret);

        const userRepository: Repository<User> = getRepository(User);
        const user: User | void = await userRepository
            .createQueryBuilder('user')
            .where({ phone })
            .getOne()
            .catch(() => {
                res.status(400).send('Что-то пошло не так LoginUserController getOne');
            });

        if (user) {
            user.authToken = authToken;

            await LoginUserController.checkErrors(res, user);
            await UpdateUserController.put(req, res, user);
        } else {
            const user: User = new User();
            user.phone = phone;
            user.authToken = authToken;

            await LoginUserController.checkErrors(res, user);
            await PostUserController.post(req, res, user);
        }
    };

    private static checkErrors = async (res: Response, user: User) => {
        const errors: any = await validate(user);

        if (errors.length > 0) {
            res.status(400).send(errors);

            return;
        }
    };
}
