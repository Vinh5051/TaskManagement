import {Repository, EntityRepository} from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {InternalServerErrorException, ConflictException, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCreadentials: AuthCredentialsDto): Promise<void> {
        const {name, username, password} = authCreadentials;

        const user = new User();
        user.name = name;
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('UserName already exits!');
            }

            throw new InternalServerErrorException();
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async signIn(authCredenttials: AuthCredentialsDto): Promise<User> {
        const {username, password} = authCredenttials;

        const user = await this.findOne({username});

        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }
}
