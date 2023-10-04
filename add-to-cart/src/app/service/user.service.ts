import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private usernameSubject = new BehaviorSubject<string>('');
  username$ = this.usernameSubject.asObservable();
  buttonClicked = new Subject<void>();
  setUsername(username: string) {
    this.usernameSubject.next(username);
  }
  getUsername(): Observable<string> {
    return this.usernameSubject.asObservable();
  }
  triggerButtonClick() {
    this.buttonClicked.next();
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  adminLogin({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'Sourav Prasanna', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }
}
