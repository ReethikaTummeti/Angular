import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserType } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: UserType | null = null;
  private userSubject = new BehaviorSubject(this._user);
  userObservable: Observable<UserType | null>;

  constructor(private http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
    this.rehydrate();
  }

  rehydrate() {
    if (localStorage.getItem('user')) {
      this._user = JSON.parse(localStorage.getItem('user') as string);
      this.userSubject.next(this._user);
    }
  }
  createSession(user: UserType) {
    localStorage.setItem('user', JSON.stringify(user));
    this._user = user;
    this.userSubject.next(this._user);
  }

  logout() {
    localStorage.removeItem('user');
    this._user = null;
    this.userSubject.next(null);
  }

  isLoggedIn() {
    return !!this._user;
    //!! returns a boolean, true if object isn't null, else false
  }

  login(email: string, password: string) {
    const apiKey = 'AIzaSyBBzlTV1sd7UtQxDDSN3I8B1uQtkG_Dvm8';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const data = { email, password, returnSecureToken: true };
    return this.http.post<UserType>(url, data);
  }
}
