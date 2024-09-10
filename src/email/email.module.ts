import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MailerOptions> => {
        return {
          transport: {
            service: 'QueueTest',
            host: configService.get<string>('SMTP_HOST'),
            port: configService.get<number>('SMTP_PORT'),
            auth: {
              user: configService.get<string>('SMTP_USER'),
              pass: configService.get<string>('SMTP_PASSWORD')
            },
          },
          defaults: {
            from: configService.get<string>('FROM_EMAIL'),
          },
        }
      }
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
