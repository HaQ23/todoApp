import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import {
  GetUsersResponse,
  LoginUser,
  PostUser,
  PostUserResponse,
  User,
} from '../interfaces/user';
import { Observable, map, catchError, of, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {}
  register(userData: PostUser): Observable<PostUserResponse> {
    return this.http.post<PostUserResponse>(`${this.apiUrl}/users`, userData);
  }
  checkUserExists(userName: string): Observable<boolean> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<GetUsersResponse[]>(url).pipe(
      map((users) => users.some((user) => user.userName === userName)),
      catchError(() => of(false))
    );
  }
  login(userData: LoginUser): Observable<User[]> {
    return this.http.get<GetUsersResponse[]>(`${this.apiUrl}/users`).pipe(
      map((userArr) =>
        userArr.filter(
          (user) =>
            user.userName === userData.userName &&
            user.password === userData.password
        )
      ),
      map((userArr) =>
        userArr.map((user) => new User(user.email, user.userName, user.id))
      ),
      tap((userArr) => this.handleAuthentication(userArr))
    );
  }
  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('user') as string);
    if (!userData) {
      return;
    }

    const user = new User(userData.email, userData.username, userData.idUser);
    this.user.next(user);
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }
  isLogged(): boolean {
    return !!this.user.getValue();
  }
  private handleAuthentication(userArr: User[]) {
    if (userArr.length === 0) {
      return;
    }
    const user: User = userArr[0];
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['']);
  }
}
