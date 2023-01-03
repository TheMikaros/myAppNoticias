import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewResponse, Article, ArticlesByCategoryAndPage } from '../interfaces/index';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { storedArticlesByCategory } from '../data/mock-data';

const apiKey = environment.apiKey;
const site = environment.site;

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  private ArticlesByCategoryAndPage: ArticlesByCategoryAndPage = storedArticlesByCategory;

  constructor(private http: HttpClient) {
  }

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    console.log(endpoint)
    return this.http.get<T>(`${ site }${ endpoint }`, {
      params: {
        apiKey: apiKey,
        country: 'mx',
        domains: 'wsj.com'
      }
    })
  }


  //2 formas
  //  getTopHeadLineas(){
  //   return this.getTopHeadlinesByCategory('business',false);
  //  }



   getTopHeadLineas():Observable<Article[]>{
    return this.getTopHeadlinesByCategory('business');
    // return this.http.get<NewResponse>(site,{
    //   params: { apiKey: apiKey }
    // }).pipe(
    //   map( ({articles}) => articles)
    // );
   }


   getTopHeadlinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]>{
    // return this.http.get<NewResponse>(`https://newsapi.org/v2/everything?country=mx&category=${category}&domains=wsj.com`,{
    //   params: { apiKey: apiKey }
    // }).pipe(
    //   map( ({articles}) => articles)
    // );

    //para no llegar a internet
    return of(this.ArticlesByCategoryAndPage[category].articles)
    // ^^ se usa este return

    if(loadMore){
      return this.getArticlesByCategory(category);
    }

    if(this.ArticlesByCategoryAndPage[category]){
      return of(this.ArticlesByCategoryAndPage[category].articles)
    }

    return this.getArticlesByCategory(category);

   }

   private getArticlesByCategory(category:string): Observable<Article[]>{
    if(!Object.keys(this.ArticlesByCategoryAndPage).includes(category)){
      this.ArticlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.ArticlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewResponse>(`/top-headlines?category=${category}&page=${page}`)
    .pipe(
      map( ({articles}) => {

        if(articles.length === 0) return this.ArticlesByCategoryAndPage[category].articles;

        this.ArticlesByCategoryAndPage[category] = {
          page: page,
          articles: [...this.ArticlesByCategoryAndPage[category].articles, ...articles]
        }

        return this.ArticlesByCategoryAndPage[category].articles;
      })
    );

  }

}
