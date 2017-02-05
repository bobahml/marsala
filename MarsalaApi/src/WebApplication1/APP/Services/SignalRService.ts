import { Injectable, EventEmitter } from "@angular/core";
import { SETTINGS } from "../shared/settings";
import { ContextStore } from "../shared/ContextStore";
import { IOrder, ISummary } from "../Models/order";

import 'signalR';
import * as $ from 'jquery'; 

@Injectable()
export class SignalRService {

    private proxy:  SignalR.Hub.Proxy;
    private proxyName: string = "messages";
    private connection: SignalR.Hub.Connection;

    foodchanged: EventEmitter<any>;
    orderUpdated: EventEmitter<IOrder>;
    connectionEstablished: EventEmitter<Boolean>;
    connectionExists: Boolean;

    constructor(private contextStore: ContextStore) {
        this.foodchanged = new EventEmitter();
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.orderUpdated = new EventEmitter<IOrder>();
        this.connectionExists = false;

        this.connect();

        this.contextStore.userChanged.subscribe(user => {
            
            if (user) {
                this.connect();
            } else {
                this.disconnect();
            }
        });
    }

    private connect(): void {
        var token: string = this.contextStore.getToken();
        if (!token) {
            this.disconnect();
            return;
        }

        if (this.connectionExists) {
            return;
        }
        this.connection = $.hubConnection(SETTINGS.signalRUrl);
        
        if (token) {
            this.connection.qs = { 'authorization': token }
        }
        
        this.proxy = this.connection.createHubProxy(this.proxyName);
        this.registerOnServerEvents();
        this.startConnection();
    }

    private disconnect(): void {
        if (this.connection) {
            this.connection.stop();
            this.connectionEstablished.emit(false);
            this.connectionExists = false;
        }    
    }

    private startConnection(): void {
        this.connection.start().done((data) => {
            console.log("Now connected " + data.transport.name + ", connection ID= " + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error) => {
            console.log("Could not connect " + error);
            this.connectionEstablished.emit(false);
            this.connectionExists = false;
        });
    }

    private registerOnServerEvents(): void {
        this.proxy.on("FoodUpdated", (data) => {
            this.foodchanged.emit(data);
        });

        this.proxy.on("OrderUpdated", (data: IOrder) => {
            this.orderUpdated.emit(data);
        });
    }
}