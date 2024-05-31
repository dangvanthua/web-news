import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../model/article.model";

@Injectable({ providedIn: 'root' })
export class NewService {
    articles: Article[] = [];
    private apiKey = 'e9569a324a564f079942243aa405fc90';
    private apiUrl = 'https://newsapi.org/v2/top-headlines';

    constructor(private http: HttpClient) { }

    getTopHeadLines(country: string): Observable<any> {
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.apiKey}`;
        return this.http.get(url);
    }

    getNewsByCategoryAndCountry(category: string, country: string): Observable<any> {
        const params = new HttpParams()
            .set('category', category)
            .set('country', country)
            .set('apiKey', this.apiKey);

        return this.http.get<any>(this.apiUrl, { params });
    }


    saveArticle(articles: []) {
        this.articles = articles;
    }
}