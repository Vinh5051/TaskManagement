import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
