import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Message } from "../models/message.model";

@Injectable({
  providedIn: "root",
})
export class MessagesService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/message`;
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl);
  }

  view(id: string): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/${id}`);
  }

  create(message: Message): Observable<Message> {
    return this.http.post<Message>(this.baseUrl, message);
  }

  update(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/${message.id}`, message);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.baseUrl}/${id}`);
  }

  getMessagesByChat(chatId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/chat/${chatId}`);
  }

  deleteMessagesByChat(chatId: string): Observable<Message[]> {
    return this.http.delete<Message[]>(`${this.baseUrl}/chat/${chatId}`);
  }

  getMessagesCountByDate(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/count`);
  }
}
