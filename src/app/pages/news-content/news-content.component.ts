import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HeaderComponent } from '../../components/header/header.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TruncatePipe } from '../../pipe/truncate.pipe';
import { Subscription } from 'rxjs';
import { Article } from '../../model/article.model';

@Component({
  selector: 'app-news-content',
  standalone: true,
  imports: [HeaderComponent, DatePipe, TruncatePipe],
  templateUrl: './news-content.component.html',
  styleUrl: './news-content.component.scss',
})
export class NewsContentComponent implements OnInit, OnDestroy {
  defaultPathImage = '/assets/images/error404.png';
  article: Article | null = null;
  articles: Article[] = [];
  @ViewChild('containerTopNews', { static: false }) containerTopNews!: ElementRef;
  private routeSub!: Subscription;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const title = params['id'];
      this.article = this.dataService.getArticleByTitle(title) || null;
    });

    this.dataService.getArticleCategory().subscribe((articles: Article[]) => {
      this.articles = articles;
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
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

    const topnews = this.containerTopNews.nativeElement.querySelector('.topnews');
    topnews.style.transform = `translateX(-${percentMoveX}%)`;
  }

  viewArticle(article: Article) {
    this.dataService.setArticle(article);
    this.router.navigate(['/news', article.title]);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultPathImage;
  }
}
