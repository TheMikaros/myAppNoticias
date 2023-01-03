import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor( private newsServices:NewsService) {}

  public categories: string[] = ['business','entertainment','general','health','science','sports','technology'];
  public selectedCategorie: string = this.categories[0];
  public articles: Article[] = [];

  @ViewChild(IonInfiniteScroll) infinitScroll!: IonInfiniteScroll;

  ngOnInit(){

    this.newsServices.getTopHeadlinesByCategory(this.selectedCategorie)
      .subscribe( articles => {
        this.articles = [ ...articles ]
      })
  }

  segmentChanged( event: Event ) {

    this.selectedCategorie = (event as CustomEvent).detail.value;
    this.newsServices.getTopHeadlinesByCategory(this.selectedCategorie)
      .subscribe( articles => {
        this.articles = [ ...articles ]
    })
  }

  // loadData(event: any){
  //   this.newsServices.getTopHeadlinesByCategory(this.selectedCategorie,true).subscribe(articles => {

  //     if(articles[articles.length].title === this.articles[this.articles.length].title){
  //       event.target.disabled = true;
  //       return
  //     }

  //     this.articles = articles;
  //     event.target.complete();
  //   })
  // }

  loadData(){
      this.newsServices.getTopHeadlinesByCategory(this.selectedCategorie,true).subscribe(articles => {


        if ( articles.length === this.articles.length ) {
          this.infinitScroll.disabled = true;
          // event.target.disabled = true;
          return;
        }
        // if(articles[articles.length].title === this.articles[this.articles.length].title){
        //   this.infinitScroll.disabled = true;
        //   return
        // }

        this.articles = articles;
        this.infinitScroll.complete();
      })
    }

}
