import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private hostUrl = `http://localhost:8082/`; // don't use local in case of cross domain or ip address
  private apiUrl = `${this.hostUrl}api/v2`;
  private loginUrl = `${this.apiUrl}/login`;
  private registerUrl = `${this.apiUrl}/register`;
  private productUrl = `${this.apiUrl}/product`;
  private transactionUrl = `${this.apiUrl}/transaction`;
  private reportTranUrl = `${this.transactionUrl}/report`;

  // test
  constructor(private http: HttpClient) {}
  timestamp = Date.now().toString();

  searchProduct(searchTerm: Subject<string>) {
    return searchTerm.pipe(
      switchMap((value: string) => {
        if (value) {
          return this.getProductByKeyword(value);
        } else {
          return this.getProducts();
        }
      })
    );
  }

  login(value: User) {
    return this.http.post<any>(this.loginUrl, value, { headers: this.headers });
  }

  register(value: any) {
    return this.http.post<any>(this.registerUrl, value, {
      headers: this.headers,
    });
  }

  //--------------------------

  clearCache() {
    this.timestamp = Date.now().toString();
  }

  public assets(image: string): string {
    return `${environment.baseUrl}/assets/${image}`;
  }

  public get defaultImage(): string {
    return `${environment.baseUrl}/assets/images/cmdev_logo.png`;
  }

  getProductImage(imageName: string) {
    return (
      environment.node_static_url +
      '/images/' +
      imageName +
      '?timestamp=' +
      this.timestamp
    );
  }

  public get isLoggedIn(): boolean {
    return localStorage.getItem(environment.token) != null;
  }

  getProducts() {
    // this.headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization:
    //     'Bearer ' + localStorage.getItem(environment.token) ?? 'no-token',
    // });

    return this.http.get<Product[]>(this.productUrl, { headers: this.headers });
  }

  addProduct(product: any) {
    return this.http.post<any>(this.productUrl, product);
  }

  deleteProduct(id: string) {
    const url = `${this.productUrl}/id/${id}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }

  getProductById(id: number) {
    const url = `${this.productUrl}/id/${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  updateProduct(product: any) {
    return this.http.put<any>(this.productUrl, product);
  }

  sendTransaction(data: any) {
    return this.http.post<any>(this.transactionUrl, data, {
      headers: this.headers,
    });
  }

  getTransaction() {
    return this.http.get<any[]>(`${this.transactionUrl}`);
  }

  getTransactionById(id: string) {
    return this.http.get<any>(`${this.transactionUrl}/id/${id}`);
  }

  getTransactionByDate(startDate: string, endDate: string) {
    return this.http.get<any[]>(
      `${this.transactionUrl}/between/${startDate}/${endDate}`
    );
  }

  getTransactionReport(date: string) {
    return this.http.get<any>(`${this.reportTranUrl}/${date}`);
  }

  getProductByKeyword(keyword: String) {
    const url = `${this.productUrl}/name/${keyword}`;
    return this.http.get<any[]>(url);
  }
}
