import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewResponse, Article } from '../interfaces/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) {

   }

  //2 formas
  //  getTopHeadLineas(){
  //   return this.http.get(`https://newsapi.org/v2/everything?q=tesla&from=2022-12-02&sortBy=publishedAt&apiKey=${apiKey}`)
  //  }



   getTopHeadLineas():Observable<Article[]>{
    return this.http.get<NewResponse>(`https://newsapi.org/v2/everything?q=tesla&from=2022-12-02&sortBy=publishedAt`,{
      params: { apiKey: apiKey }
    }).pipe(
      map( ({articles}) => articles)
    );
   }


}
