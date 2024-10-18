import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('MYSQL_HOST'),
                port: configService.get('MYSQL_PORT'),
                username: configService.get('MYSQL_USERNAME'),
                password: configService.get('MYSQL_ROOT_PASSWORD'),
                database: configService.get('MYSQL_DATABASE'),
                autoLoadEntities: true,
                synchronize: true
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
