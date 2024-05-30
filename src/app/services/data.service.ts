import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private _articleCategory: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private articleCategory$: Observable<any[]> = this._articleCategory.asObservable();
    
    constructor() {}

    setArticleCategory(articles: any[]): void {
        this._articleCategory.next(articles);
    }

    getArticleCategory(): Observable<any[]> {
        return this.articleCategory$;
    }
}