import { Injectable } from '@nestjs/common';
import { MqttService } from './mqtt/mqtt.service';

@Injectable()
export class AppService {
  constructor(private readonly mqttService: MqttService) { }
  async getHello(): Promise<string> {

    const message = await this.mqttService.mqtt.publishAsync(
      '/from-device',
      'Hello from the other side hehe!',
      { qos: 2, retain: false },
    );

    console.log({ message });

    return 'Hello World!';
  }
}
