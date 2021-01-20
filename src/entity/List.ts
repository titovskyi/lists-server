import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(
    () => Product,
    (product) => product.list,
    {eager: true, cascade: true}
  )
  public product: Product[];
}

export default List;