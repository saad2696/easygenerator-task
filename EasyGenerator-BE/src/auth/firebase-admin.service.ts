// src/firebase/firebase-admin.service.ts
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAdminService {
  constructor(private configService: ConfigService) {
    const adminConfig = {
      credential: admin.credential.cert({
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
        privateKey: this.configService
          .get<string>('FIREBASE_PRIVATE_KEY')
          ?.replace(/\\n/g, '\n'),
      }),
      databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
    };
    admin.initializeApp(adminConfig);
  }

  getAuth() {
    return admin.auth();
  }
}
