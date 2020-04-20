import {PassportStrategy} from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'Leran-test_management-by-Vinh_Mai',
        });
    }

    async validate(payload: jwtPayload): Promise<User> {
        const {username} = payload;
        const user = await this.userRepository.findOne({username});

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
