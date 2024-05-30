import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HeaderComponent } from '../../components/header/header.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-content',
  standalone: true,
  imports: [HeaderComponent, DatePipe],
  templateUrl: './news-content.component.html',
  styleUrl: './news-content.component.scss',
})
export class NewsContentComponent implements OnInit {
  article: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.article = this.dataService.getArticle();
    console.log(this.article);
  }
}
