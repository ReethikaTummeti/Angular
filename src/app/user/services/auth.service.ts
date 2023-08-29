import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    const apiKey = 'AIzaSyBBzlTV1sd7UtQxDDSN3I8B1uQtkG_Dvm8';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const data = { email, password, returnSecureToken: true };
    return this.http.post(url, data);
  }
}
