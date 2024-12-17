import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { environment } from "src/environments/environment";
import { MessageP } from "../models/messageP.model";

@Injectable({
  providedIn: "root",
})
export class WebSocketService extends Socket {
  constructor() {
    super({
      url: environment.url_ms_business,
      options: {
        // Puedes agregar opciones adicionales aquí si es necesario
      },
    });
  }

  // Emitir un mensaje al servidor
  sendMessage(msg: MessageP) {
    this.emit("message", msg);
  }

  // Escuchar mensajes entrantes del servidor
  onMessage() {
    return this.fromEvent<MessageP>("message");
  }
}
