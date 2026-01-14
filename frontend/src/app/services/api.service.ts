import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://192.168.100.158:3000/api';

  constructor(private http: HttpClient) {}

  login(username: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { username });
  }

  getPlayer() {
    return this.http.get(`${this.baseUrl}/player/me`);
  }
}