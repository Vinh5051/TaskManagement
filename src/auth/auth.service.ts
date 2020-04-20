import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {JwtService} from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const user = await this.userRepository.signIn(authCredentialsDto);

        if (!user) {
            throw new UnauthorizedException('Usename or password invalid!!!');
        }

        const {name, username} = user;
        const payload: jwtPayload = { name, username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
