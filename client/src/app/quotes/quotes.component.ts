import { Component, OnInit } from '@angular/core';
import { GotService } from '../services/got.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent implements OnInit {
  quotes: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private gotService: GotService) {}

  // Function to fetch and assign 5 random quotes
  getRandomQuotes(): void {
    // Set loading to true before making the API call
    this.loading = true;
    // call the service to get random 5 quotes
    this.gotService
      .getQuotes()
      .pipe(
        // Handle any errors that occur during the API call
        catchError((error: string) => {
          this.error = 'Error loading quotes. Please try again later.';
          // Return an empty array to continue the flow without stopping the application
          return of([]);
        }),
        // Finalize block to run after the API call is completed (success or error)
        finalize(() => {
          this.loading = false;
        })
        // Subscribe to the service method that retrieves random quotes
      )
      .subscribe((quotes) => {
        // Assign the fetched quotes to the component property
        this.quotes = quotes;
      });
  }

  ngOnInit(): void {
    // Call the function to fetch random quotes when the component is initialized
    this.getRandomQuotes();
  }
}
