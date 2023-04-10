import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  public assets(image: string): string {
    return `/assets/${image}`;
  }

  register(value: any) {
    return this.http.post<any>('http://localhost:3000/register', value, {
      headers: this.headers,
    });
  }

  login(value: any) {
    return this.http.post<any>('/login', value);
  }
}
