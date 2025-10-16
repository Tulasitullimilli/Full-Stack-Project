import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entity/user.model';
import { Leave } from './entity/leave.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports:[SequelizeModule.forFeature([User,Leave]),
PassportModule,
JwtModule.register({
  secret:'secretKey',
  signOptions:{expiresIn:'1h'}
})],
  providers: [UserService,JwtStrategy],
  controllers: [UserController]
})
export class UserModule {}
