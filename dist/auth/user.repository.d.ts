import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class UserRepository extends Repository<User> {
    signUp(authCreadentials: AuthCredentialsDto): Promise<void>;
    private hashPassword;
    signIn(authCredenttials: AuthCredentialsDto): Promise<User>;
}
