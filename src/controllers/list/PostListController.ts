import {Request, Response} from "express";

import {List} from "../../entity/List";

import { validate, ValidationError } from "class-validator";
import { getRepository, Repository } from "typeorm";

export class PostListController {
  static post = async(req: Request, res: Response) => {
    const {name} = req.body;
    console.log(req.body);
    const listRepository: Repository<List> = getRepository(List);
    const list: List = new List();
    list.name = name;

    const errors: any = await validate(list);
    if(errors.length > 0) {
      res.status(400).send(errors);

      return;
    }

    try {
      await listRepository.save(list);

      res.status(200).send(list);
    } catch(err) {
      res.status(409).send(err);
    }

  }
}