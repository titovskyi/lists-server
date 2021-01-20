import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {List} from "./List";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public category: string;

  @Column()
  public status: boolean;

  @ManyToOne(
    () => List,
    (list) => list.product
  )
  @JoinColumn({name: "listId"})
  public list: Promise<List>;
}

export default Product;