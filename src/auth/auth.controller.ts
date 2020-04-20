import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {prototype} from 'events';
import {AuthGuard} from '@nestjs/passport';
import { GetUser } from './get-user.decorater';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    // @UsePipes(ValidationPipe)
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string} > {
        return await this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);
    }
}
