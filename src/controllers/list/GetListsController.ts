import {Request, Response} from "express";
import {getRepository, Repository} from "typeorm";
import {List} from "../../entity/List";

export class GetListsController {
  static get = async(req: Request, res: Response) => {
    const listRepository: Repository<List> = getRepository(List);
    const lists: List[] = await listRepository.find({
      select: ["id", "name", "product"]
    });

    res.send(lists);
  }
}