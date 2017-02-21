import { Injectable, EventEmitter } from "@angular/core";
import { SETTINGS } from "../Shared/settings";
import { IOrder, IOrderSentStatus } from "../Models/order";
import * as $ from "jquery";
import "signalR";


@Injectable()
export class SignalRService {

    private proxy: SignalR.Hub.Proxy;
    private proxyName = "messages";
    private connection: SignalR.Hub.Connection;

    foodChanged: EventEmitter<any>;
    orderUpdated: EventEmitter<IOrder>;
    orderSent: EventEmitter<IOrderSentStatus>;
    connectionEstablished: EventEmitter<Boolean>;
    connectionExists: Boolean;

    constructor() {
        this.foodChanged = new EventEmitter();
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.orderUpdated = new EventEmitter<IOrder>();
        this.orderSent = new EventEmitter<IOrderSentStatus>();
        this.connectionExists = false;
    }

    public connect(token: string): void {
        if (!token) {
            this.disconnect();
            return;
        }

        if (this.connectionExists) {
            return;
        }
        this.connection = $.hubConnection(SETTINGS.signalRUrl);
        this.connection.qs = { "authorization": token };

        this.proxy = this.connection.createHubProxy(this.proxyName);
        this.registerOnServerEvents();
        this.startConnection();
    }

    public disconnect(): void {
        if (this.connection) {
            this.connection.stop();
            this.connectionEstablished.emit(false);
            this.connectionExists = false;
        }
    }

    private startConnection(): void {
        this.connection.start().done((data) => {
            console.log(`Now connected ${data.transport.name}, connection ID= ${data.id}`);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error) => {
            console.log(`Could not connect ${error}`);
            this.connectionEstablished.emit(false);
            this.connectionExists = false;
        });
    }

    private registerOnServerEvents(): void {
        this.proxy.on("FoodUpdated", (data) => {
            this.foodChanged.emit(data);
        });

        this.proxy.on("OrderUpdated", (data: IOrder) => {
            this.orderUpdated.emit(data);
        });

        this.proxy.on("OrderSent", (data: IOrderSentStatus) => {
            this.orderSent.emit(data);
        });
    }
}