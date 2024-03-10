import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): void {
    const url = 'http://localhost:3000/users/login';
    const body = { username, password };

    this.http.post(url, body).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    ).subscribe((response: any) => {
      // Handle successful login response here
      console.log('Login successful:', response);
      // Perform further actions such as redirecting to another page
    });
  }
}
