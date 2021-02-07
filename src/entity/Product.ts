import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { List } from './List';

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

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updateAt: Date;

    @ManyToOne(
        () => List,
        (list) => list.products
    )
    @JoinColumn({ name: 'listId' })
    public list: List;
}

export default Product;
