import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import List from './List';
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@Entity()
@Unique(['phone'])
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @MinLength(13)
    @MaxLength(13)
    public phone: string;

    @Column({ nullable: true })
    public authToken: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updateAt: Date;

    @ManyToMany(
        () => List,
        (list) => list.users
    )
    lists: List[];
}

export default User;
