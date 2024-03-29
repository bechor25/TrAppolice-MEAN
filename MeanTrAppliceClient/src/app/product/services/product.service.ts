
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Case } from '../models/case';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/product`;
  private apiUrlSend = `${environment.apiUrl}`;
  private apiUrlCount = `${environment.apiUrl}/product-dashbord`;
  private apiUrlCountSim = `${environment.apiUrl}/product-countSympol`;
  private apiUrlCountMoney = `${environment.apiUrl}/product-countMoney`;
  private apiUrlUserRe = `${environment.apiUrl}/user-remove`;


  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('ProductService')
  }

  getCountMoney() {
    return this.http.get(`${this.apiUrlCountMoney}`)
    .pipe(
      catchError(this.handleError('getCountMoney', null))
    )
  }
  getCountSim() {
    return this.http.get(`${this.apiUrlCountSim}`)
    .pipe(
      catchError(this.handleError('getCountSim', null))
    )
  }

  getCountProducts() {
    return this.http.get(`${this.apiUrlCount}`)
    .pipe(
      catchError(this.handleError('getCountProducts', null))
    )
  }
  //get all reports between
  getProductDate(date1:number,date2:number) :Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/${date1}/${date2}`)
    .pipe(
      catchError(this.handleError('getProductDate', null))
    )
  }
//get report name officer filter
  getProductName(params1:string) :Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/${params1}`)
    .pipe(
      catchError(this.handleError('getProductName', null))
    )
  }
  //get report id number
  getProductIdSearch(idSearch:number) :Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/${idSearch}`)
    .pipe(
      catchError(this.handleError('getProductIdSearch', null))
    )
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(this.handleError('getProduct', null))
    )
  }
  //get all officer
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`)
    .pipe(
      catchError(this.handleError('getUser', []))
    )
  }

  getUsers(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError(this.handleError('getUsers', null))
    )
  }


  addProduct(product: Product) {
    return this.http.post<Product>(`${this.apiUrl}/add`, product, this.httpOptions)
    .pipe(
      catchError(this.handleError('addProduct', null))
    )
  }

  addContact(caseOen: Case) {
    return this.http.post<Case>(`${this.apiUrl}/add-Case`, caseOen, this.httpOptions)
    .pipe(
      catchError(this.handleError('addContact', null))
    )
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/update`, product, this.httpOptions)
    .pipe(
      catchError(this.handleError('updateProduct', null))
    )
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
    .pipe(
      catchError(this.handleError('deleteProduct', null))
    )
  }
////

  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrlUserRe}/update`, user, this.httpOptions)
    .pipe(
      catchError(this.handleError('updateUser', null))
    )
  }

  deleteUser(id_rank: number) {
    return this.http.delete(`${this.apiUrlUserRe}/delete/${id_rank}`)
    .pipe(
      catchError(this.handleError('deleteUser', null))
    )
  }


}

