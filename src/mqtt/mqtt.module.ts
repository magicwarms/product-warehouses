import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    ConfigModule,
    EmailModule
  ],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule { }
