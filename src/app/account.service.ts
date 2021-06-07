import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAccount } from './Account';
import { IBeneficiary } from './Beneficiary';
import { INominee } from './Nominee';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private _url: string = 'http://localhost:8083/';


  getAccountByAccountId(id: number){

    return this.http.get<IAccount>(this._url + "account?accountId=" + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

  }

  addNominee(nominee: INominee){

    return this.http.post(this._url + 'nominee', nominee).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
  }

  removeNominee(id: number){

    console.log('removeNominee', id);
    
    
    return this.http.delete(this._url + 'nominee?nomineeId=' + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
  }

  addBeneficiary(beneficiary: IBeneficiary){

    return this.http.post(this._url + 'beneficiary', beneficiary).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
  }


  removeBeneficiary(id: number){
    
    return this.http.delete(this._url + 'beneficiary?beneficiaryId=' + id).pipe(tap(data => console.log(data)), catchError(this.errorHandler));
  }

 

  updateAccount(account: IAccount){

    console.log(account);
    
    let accountType;
    if(account.hasOwnProperty("minBalance")){

      console.log('Savings Account');
      accountType = 'savings';
      
    }else{

      console.log('Term Account');
      accountType = 'term';
    }

    return this.http.post(this._url + 'account/' + accountType, account).pipe(tap(data => console.log(data)), catchError(this.errorHandler));

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
