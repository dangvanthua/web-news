import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  categoryName!: string;
  private article: any;
  private _articleCategory: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  private articleCategory$: Observable<any[]> =
    this._articleCategory.asObservable();

  constructor() {}

  setArticle(article: any) {
    localStorage.setItem('article', JSON.stringify(article));
    this.article = article;
  }

  getArticle() {
    if (!this.article) {
      const storedArticle = localStorage.getItem('article');
      this.article = storedArticle ? JSON.parse(storedArticle) : null;
    }
    return this.article;
  }

  setArticleCategory(articles: any[]): void {
    this._articleCategory.next(articles);
    localStorage.setItem('articleCategory', JSON.stringify(articles));
  }

  getArticleCategory(): Observable<any[]> {
    const storedArticles = localStorage.getItem('articleCategory');
    if (storedArticles) {
      this._articleCategory.next(JSON.parse(storedArticles));
    }
    return this.articleCategory$;
  }
}
