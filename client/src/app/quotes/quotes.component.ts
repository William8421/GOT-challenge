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

  // Function to fetch and assign 5 random quotes
  getRandomQuotes() {
    this.gotService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }

  ngOnInit(): void {
    this.getRandomQuotes();
  }
}
