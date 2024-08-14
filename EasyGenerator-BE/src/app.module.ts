import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './auth/firebase-admin.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from './user/user.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(
      'mongodb+srv://sahmed:jE140bFABQfs5Cly@easygen.0sr7k.mongodb.net/?retryWrites=true&w=majority&appName=easygen',
    ),
  ],
  controllers: [AuthController],
  providers: [FirebaseAdminService, UserService],
})
export class AppModule {}
