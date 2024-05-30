import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class NewService {
    articles: any[] = [];
    private apiKey = 'e9569a324a564f079942243aa405fc90'; 
    private apiUrl = 'https://newsapi.org/v2/top-headlines';

    constructor(private http: HttpClient) {}

    getTopHeadLines(country: string): Observable<any> {
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.apiKey}`;
        return this.http.get(url);
    }

    getNewsByCategory(category: string): Observable<any> {
        const params = {
            apiKey: this.apiKey,
            category: category,
            country: 'us'
        }

        return this.http.get<any>(this.apiUrl, {params});
    }

    saveArticle(articles: []){
        this.articles = articles;
    }
}