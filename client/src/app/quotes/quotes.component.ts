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
    // Subscribe to the service method that retrieves random quotes
    this.gotService.getQuotes().subscribe((quotes) => {
      // Assign the fetched quotes to the component property
      this.quotes = quotes;
    });
  }

  ngOnInit(): void {
    // Call the function to fetch random quotes when the component is initialized
    this.getRandomQuotes();
  }
}
