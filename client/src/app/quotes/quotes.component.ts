import { Component, OnInit } from '@angular/core';
import { GotService } from '../services/got.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  quotes: any[] = [];

  constructor(private gotService: GotService) {}

  getRandomQuotes() {
    this.gotService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }

  ngOnInit(): void {
    this.getRandomQuotes();
  }
}
