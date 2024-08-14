// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb+srv://sahmed:jE140bFABQfs5Cly@easygen.0sr7k.mongodb.net/?retryWrites=true&w=majority&appName=easygen',
      }),
    }),
  ],
})
export class DatabaseModule {}
