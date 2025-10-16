import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { LoggerMiddleware } from './middleware/user.middleware';

@Module({
  imports: [UserModule,SequelizeModule.forRoot({
    dialect:'mysql',
    port:3306,
    host:'localhost',
    username:'root',
    password:'Tulasi@2004',
    database:'leaveManagedb',
    synchronize:true,
    autoLoadModels:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
//  implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }