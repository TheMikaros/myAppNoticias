export interface NewResponse {
  status:       string;
  totalResults: number;
  articles:     Article[];
}

export interface Article {
  source:      Source;
  author:      null | string;
  title:       string;
  description: null | string;
  url:         string;
  urlToImage:  null | string;
  publishedAt: Date | string;
  content:     string | null;
}

export interface Source {
  id:   null | string;
  name: string;
}

export interface ArticlesByCategoryAndPage{
  [key: string]:{
    page: number,
    articles: Article[]
  }
}
