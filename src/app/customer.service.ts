import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAccount } from './Account';
import { ICustomer } from './Customer';
import { ITransaction } from './Transaction';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }


  getCustomer(id: number): Observable<ICustomer>{

    // customer?userId=2
    return this.http.get<ICustomer>(this._url + "customer?userId=" + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }

  getAccountByCustomerId(id: number): Observable<IAccount>{

    return this.http.get<IAccount>(this._url + "accounts/customerId?customerId=" + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }

  getAccountByAccountId(id: number){

    return this.http.get<IAccount>(this._url + "account?accountId=" + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }


  getAllTransactionsByAccountId(accountId: number): Observable<ITransaction[]>{

    return this.http.get<ITransaction[]>(this._url + "transactions?accountId=" + accountId).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }


  transferMoney( senderAccountId: number, receiverAccountId: number, amount: number, username: string, password: string){

    return this.http.post(this._url + 'account/transfer?senderAccountId=' + senderAccountId + '&receiverAccountId=' + receiverAccountId + '&amount=' + amount + '&username=' + username + '&password=' + password, {}).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
  }

  withdrawMoney( accountId: number, amount: number, username: string, password: string){


    return this.http.post(this._url + 'account/withdraw?accountId=' + accountId + '&amount=' + amount + '&username=' + username + '&password=' + password, {}).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
  }

  depositMoney( accountId: number, amount: number){


    return this.http.post(this._url + 'account/deposit?accountId=' + accountId + '&amount=' + amount, {}).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
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
