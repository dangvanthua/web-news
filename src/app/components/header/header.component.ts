import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewService } from '../../services/news.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  activeCategory = 'general';
  constructor(
    private newsService: NewService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const activeCategoryString = localStorage.getItem('activeCategory');
    this.activeCategory = activeCategoryString
      ? JSON.parse(activeCategoryString)
      : 'general';
    this.newsService.getNewsByCategory('general').subscribe({
      next: (respone: any) => {
        this.dataService.categoryName = 'Tổng hợp';
        this.dataService.setArticleCategory(respone.articles);
      },
      error: (error) => {
        console.log('Fetch news by category error: ', error);
      },
      complete: () => {
        console.log('Request complete');
      },
    });
  }

  fetchNewsByCategory(event: Event, category: string, nameCategory: string) {
    event.preventDefault();
    this.newsService.getNewsByCategory(category).subscribe({
      next: (respone: any) => {
        this.activeCategory = category;
        localStorage.setItem('activeCategory', JSON.stringify(category));
        this.dataService.categoryName = nameCategory;
        // thuc hien luu vao localStorage cho category name khi chuyen trang qua lai
        localStorage.setItem('nameCategory', JSON.stringify(nameCategory));
        this.dataService.setArticleCategory(respone.articles);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Fetch news by category error: ', error);
      },
      complete: () => {
        console.log('Request complete');
      },
    });
  }
}
