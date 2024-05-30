import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewService } from '../../services/news.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() selectCategory = new EventEmitter<string>();
  constructor(private newsService: NewService, private dataService: DataService) {}

  ngOnInit(): void {
     this.newsService.getNewsByCategory('general').subscribe({
      next: (respone: any) => {
        this.selectCategory.emit('Tổng hợp');
        this.dataService.setArticleCategory(respone.articles);
      },
      error: (error) => {
        console.log('Fetch news by category error: ', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });  
  }

  fetchNewsByCategory(event: Event, category: string, nameCategory: string) {
    event.preventDefault();
    this.newsService.getNewsByCategory(category).subscribe({
      next: (respone: any) => {
        this.selectCategory.emit(nameCategory);
        this.dataService.setArticleCategory(respone.articles);
      },
      error: (error) => {
        console.log('Fetch news by category error: ', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }
}
