import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../pipe/truncate.pipe';
import { NewService } from '../../services/news.service';
import { HeaderComponent } from './../../components/header/header.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, DatePipe, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  articles: any[] = [];
  articleCategory: any[] = [];
  defaultPathImage = '/assets/images/error404.png';
  selectedName = 'Tổng quan';
  @ViewChild('containerTopNews', { static: false })
  containerTopNews!: ElementRef;

  constructor(
    private newsService: NewService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getTopHeadLines();
    this.dataService.getArticleCategory().subscribe((articles: any[]) => {
      console.log(articles);
      this.articleCategory = articles;
    });
  }

  onSelectCategoryName(categoryName: string): void {
    this.selectedName = categoryName;
  }

  getTopHeadLines() {
    const country = 'us';
    this.newsService.getTopHeadLines(country).subscribe({
      next: (respone: any) => {
        this.articles = respone.articles;
      },
      error: (error) => {
        console.error('Error fetching top headlines: ', error);
      },
      complete: () => {
        console.log('Resquest complete');
      },
    });
  }

  ngAfterViewInit() {
    if (this.containerTopNews) {
      const container = this.containerTopNews.nativeElement;
      container.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
  }

  onMouseMove(event: MouseEvent) {
    const screenWidth = window.innerWidth;
    const percentMoveX = (event.clientX / screenWidth) * 100;

    const topnews =
      this.containerTopNews.nativeElement.querySelector('.topnews');
    topnews.style.transform = `translateX(-${percentMoveX}%)`;
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultPathImage;
  }
}
