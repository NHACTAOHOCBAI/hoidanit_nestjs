import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/entities/user.entity';

export const typeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => {
    return {
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: 'root',
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: true,
    };
};
