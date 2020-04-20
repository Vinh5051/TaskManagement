import { TypeOrmModuleOptions} from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 6969,
    username: 'postgres',
    password: 'root',
    database: 'nestjsManagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
