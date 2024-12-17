import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Chat } from "../models/chat.model";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  urlBase: string;
  constructor(private http: HttpClient) {
    this.urlBase = `${environment.url_ms_business}/chat`;
  }

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.urlBase);
  }

  view(id: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.urlBase}/${id}`);
  }

  create(chat: any): Observable<Chat> {
    return this.http.post<Chat>(this.urlBase, chat);
  }

  update(chat: any): Observable<Chat> {
    return this.http.put<Chat>(`${this.urlBase}/${chat.id}`, chat);
  }

  delete(id: string): Observable<Chat> {
    return this.http.delete<Chat>(`${this.urlBase}/${id}`);
  }
}

