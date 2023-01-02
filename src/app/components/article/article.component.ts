import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  @Input() index?: number;
  @Input() article!: Article;

  constructor() { }

  ngOnInit() {}

}
