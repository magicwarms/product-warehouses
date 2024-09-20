import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MqttClient, connect } from 'mqtt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class MqttService implements OnModuleInit, OnApplicationShutdown {
    public mqtt: MqttClient;

    constructor(
        private readonly configService: ConfigService,
        private readonly mailService: EmailService,
    ) { }
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
                console.error({ errMQTTOnSubscribeFromDevice: err });
            }
            console.log({ grantedMQTT: granted });
            // Callback langsung untuk pesan dari topik tersebut
            this.mqtt.on('message', (receivedTopic, message) => {
                if (receivedTopic === granted[0].topic) {
                    console.log(`Received message on ${receivedTopic}: ${message.toString()}`);
                }
            });
        });

        this.mqtt.subscribe('/send-product-email', { qos: 2 }, (err, granted) => {
            if (err) {
                console.error({ errMQTTOnSubscribeSendProductEmail: err });
            }
            console.log({ grantedMQTT: granted });
            // Callback langsung untuk pesan dari topik tersebut
            this.mqtt.on('message', (receivedTopic, message) => {
                if (receivedTopic === granted[0].topic) {
                    console.log(`Received message on ${receivedTopic}: ${message.toString()}`);
                    const emailProduct = JSON.parse(message.toString());
                    this.mailService.sendEmail({
                        email: 'andhanautama@gmail.com',
                        subject: `New product created ${emailProduct.name}`,
                        html: `<p>Hello Andhana,</p>
                      <p>Thank you for store the product! Your product is now active.</p>
                      <p>Description: ${emailProduct.description}</p>
                      <p>Enjoy your time with us!</p>`,
                    }).then((data) => {
                        if (data.accepted.length > 0) {
                            console.log('Email successfully sent to ' + data.accepted.join(', '));
                        }
                    }).catch((err) => console.error(err));
                }
            });
        });

        this.mqtt.on('message', function (topic, message) {
            console.log('New message received! in topic -> ' + topic);
        });
    }

    async onApplicationShutdown(signal?: string) {
        console.log("Disconnecting from MQTT server...");
        this.mqtt.end(() => {
            console.log("Disconnected from MQTT server");
        });
    }

}