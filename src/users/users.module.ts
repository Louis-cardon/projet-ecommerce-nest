import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtMiddleware } from 'src/auth/jwt.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports:[UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(UsersController);
  }
}
