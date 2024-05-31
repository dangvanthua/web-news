import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../model/article.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  categoryName!: string;
  private article: Article | null = null;
  private articles: Article[] = [];
  private _articleCategory: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>(
    []
  );
  private articleCategory$: Observable<Article[]> =
    this._articleCategory.asObservable();

  constructor() { }

  setArticle(article: Article) {
    this.article = article;
    localStorage.setItem('currentArticle', JSON.stringify(article));
  }

  getArticle() {
    const article = localStorage.getItem('currentArticle');
    return article ? JSON.parse(article) : null;
  }

  setArticles(articles: Article[]) {
    this.articles = articles;
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  getArticles() {
    const articles = localStorage.getItem('articles');
    return articles ? JSON.parse(articles) : [];
  }

  getArticleByTitle(title: string): Article | undefined {
    const articles = this.getArticles();
    return articles.find((article: Article) => article.title === title);
  }

  setArticleCategory(articles: Article[]): void {
    this._articleCategory.next(articles);
    localStorage.setItem('articleCategory', JSON.stringify(articles));
  }

  getArticleCategory(): Observable<Article[]> {
    const storedArticles = localStorage.getItem('articleCategory');
    if (storedArticles) {
      this._articleCategory.next(JSON.parse(storedArticles));
    }
    return this.articleCategory$;
  }
}
