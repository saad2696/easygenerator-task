// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    // Firebase Authentication

    try {
      const displayName = name;

      const userRecord = await this.firebaseAdminService.getAuth().createUser({
        email,
        displayName,
        password,
      });
      // Save user in MongoDB
      const user = await this.userService.createUser(
        email,
        name,
        userRecord.uid,
      );
      const message = [
        { message: 'user in mongo', user },
        { message: 'User created successfully in firebase!', userRecord },
      ];
      return message;
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        throw new HttpException(
          'Email already exists in Firebase',
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
