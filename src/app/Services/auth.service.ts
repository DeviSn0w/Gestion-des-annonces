// Import necessary modules from Angular core and RxJS
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define the User interface to represent user data
interface User {
  userId: number;
  username: string;
  fullname: string;
  password: string;
  birthDay: string;
  address: string;
  phone: string;
  email: string;
}

// Injectable decorator to mark the service as injectable and provide it in the root injector
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to manage the login status
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  // BehaviorSubject to manage the authentication status
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  // Array to store user data
  private users: User[] = [];

  // Variable to store the ID of the authenticated user
  private authenticatedUserId: number | null = null;

  // Constructor to initialize the service with initial user data
  constructor() {
    // Simulate having some initial users
    this.addUser({
      userId: 1,
      username: 'yassine',
      fullname: 'yassine karrech',
      password: 'oumaima',
      birthDay: '26-09-1998',
      address: 'Tunis',
      phone: '12356',
      email: 'yassinekarrech@yahoo.com'
    });
  }

  // Method to add a new user to the array
  addUser(user: Partial<User>): void {
    this.users.push(user as User);
  }

  // Method to handle user login, returns an observable with the login status
  login(credentials: { username: string; password: string }): Observable<boolean> {
    const isValidUser = this.validateUser(credentials);

    return new Observable<boolean>((observer) => {
      setTimeout(() => {
        if (isValidUser) {
          this.authenticatedUserId = isValidUser.userId;
          this.isAuthenticatedSubject.next(true);
          observer.next(true);
        } else {
          this.isAuthenticatedSubject.next(false);
          observer.next(false);
        }
        observer.complete();
      }, 1000); // Simulate a delay for API call
    });
  }

  // Private method to validate user credentials
  private validateUser(credentials: { username: string; password: string }): User | null {
    return this.users.find(user => user.username === credentials.username && user.password === credentials.password) || null;
  }

  // Method to get the ID of the authenticated user
  getAuthenticatedUserId(): number | null {
    return this.authenticatedUserId;
  }

  // Method to get user data by ID
  getUserById(userId: number): User | null {
    const user = this.users.find(user => user.userId === userId);
    return user || null;
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    // Check if the user token is present in storage
    const userToken = localStorage.getItem('token');
    return !!userToken; // Returns true if the user token is present, otherwise false
  }

  // Method to update the login status
  updateLoggedInStatus(isLoggedIn: boolean): void {
    this.isLoggedInSubject.next(isLoggedIn);
  }
}
