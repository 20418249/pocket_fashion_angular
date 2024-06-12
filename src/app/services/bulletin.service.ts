import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bulletin, Category } from '../classes/Bulletin';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'http://localhost:5240/api/Bulletin'; // API base URL
  apiCat = 'http://localhost:5240/api/Category'; // API base URL

  // Function to fetch products from the server
  getBulletins() {
    return this.httpClient.get<Bulletin[]>(`${this.apiUrl}`); // HTTP GET request to fetch products
  }

  addBulletin() {
    return this.httpClient.post<Bulletin[]>(`${this.apiUrl}/PostBulletin`); // HTTP GET request to fetch products
  }

  getAllCategories() {
    return this.httpClient.get<Category[]>(`${this.apiCat}/GetAllCategories`); // HTTP GET request to fetch products
  }
}
