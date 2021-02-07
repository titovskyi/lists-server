import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product';
import User from './User';
import { IsArray, IsNotEmpty } from 'class-validator';

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty()
    public name: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updateAt: Date;

    @ManyToMany(
        () => User,
        (user) => user.lists
    )
    @JoinTable()
    @IsNotEmpty()
    @IsArray()
    users: User[];

    @OneToMany(
        () => Product,
        (product) => product.list,
        { cascade: true }
    )
    public products: Product[];
}

export default List;
