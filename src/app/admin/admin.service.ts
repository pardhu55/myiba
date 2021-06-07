import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICustomer } from '../Customer';
import { IAdmin } from './admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _url: string = 'http://localhost:8083/';

  constructor(private http: HttpClient) { }

  getAdminById(id: number): Observable<IAdmin>{
  
    return this.http.get<IAdmin>(this._url + "admin?userId=" + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }

  addAdmin(admin: IAdmin): Observable<IAdmin>{
  
    return this.http.post<IAdmin>(`${this._url}/admin`,admin).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }

  updateAdmin(admin: IAdmin): Observable<IAdmin>{
  
    return this.http.put<IAdmin>(`${this._url}/admin`,admin).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }

  deleteAdmin(id: number): Observable<IAdmin>{
    
    return this.http.delete<IAdmin>(this._url + "admin?userId=" + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
  }

  listAllAdmins(): Observable<IAdmin[]>{
   
    return this.http.get<IAdmin[]>(this._url + "admins").pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }


  getCustomer(id: number): Observable<ICustomer>{

    // customer?userId=2
    return this.http.get<ICustomer>(this._url + "customer?userId=" + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }

  errorHandler(err: HttpErrorResponse){
    let errorMessage = '';

    if(err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    }else{
      errorMessage = `server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }

}
