import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MqttClient, connect } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnApplicationShutdown {
    public mqtt: MqttClient;

    constructor(private readonly configService: ConfigService) { }
    async onModuleInit() {
        this.mqtt = connect(this.configService.get<string>('CONNECT_URL'), {
            clientId: this.configService.get<string>('CLIENT_ID') || null,
            clean: true,
            connectTimeout: parseInt(this.configService.get<string>('CONNECTION_TIMEOUT'), 10),
            username: this.configService.get<string>('USERNAME'),
            password: this.configService.get<string>('PASSWORD'),
            reconnectPeriod: parseInt(this.configService.get<string>('RECONNECT_PERIOD'), 10),
        });

        this.mqtt.on('error', (err) => {
            console.log({ errMQTT: err });
            process.exit(1);
        });

        this.mqtt.on('connect', () => {
            console.log('Connected to MQTT server');
        });

        this.mqtt.subscribe('/from-device', { qos: 2 }, (err, granted) => {
            if (err) {
                console.log({ errMQTTOnSubscribeFromDevice: err });
            }
            console.log({ grantedMQTT: granted });
            // Callback langsung untuk pesan dari topik tersebut
            this.mqtt.on('message', (receivedTopic, message) => {
                if (receivedTopic === granted[0].topic) {
                    console.log(`Received message on ${receivedTopic}: ${message.toString()}`);
                }
            });
        });

        this.mqtt.on('message', function (topic, message) {
            console.log('New message received!');
            // console.log({ topic });
            // console.log(message.toString());
        });
    }

    async onApplicationShutdown(signal?: string) {
        console.log("Disconnecting from MQTT server...");
        this.mqtt.end();
    }

}