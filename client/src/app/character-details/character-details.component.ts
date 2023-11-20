import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GotService } from '../services/got.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Person } from '../Models';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  characterSlug: string = '';
  characterDetails: Person = {};
  loading: boolean = false;
  error: string = '';
  quotesError: string = '';

  // Store the original quotes and currently displayed quotes
  originalQuotes: string[] = [];
  displayedQuotes: string[] = [];

  constructor(private route: ActivatedRoute, private gotService: GotService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.characterSlug = params.get('slug') || '';
      this.getDetails();
    });
  }

  getDetails(): void {
    this.loading = true;

    this.gotService
      .getCharacterDetails(this.characterSlug)
      .pipe(
        catchError((error: string) => {
          this.error =
            'Error loading character details. Please try again later.';
          return of({});
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((details) => {
        this.characterDetails = details[0];

        // Set the original quotes and initially displayed quotes
        this.originalQuotes = [...details[0].quotes];
        this.displayedQuotes = this.getRandomQuotes(2);
      });
  }

  // Function to get random quotes from the original quotes
  getRandomQuotes(count: number): string[] {
    const shuffledQuotes = this.originalQuotes.sort(() => Math.random() - 0.5);
    return shuffledQuotes.slice(0, count);
  }

  // Function to replace the displayed quotes with another set of two random quotes
  replaceQuotes(): void {
    const newQuotes = this.getRandomQuotes(2);

    // If the character has less than three quotes, show a message
    if (this.originalQuotes.length <= 2) {
      // Display an error message
      this.quotesError = `This character has only ${
        this.originalQuotes.length
      } ${this.originalQuotes.length === 1 ? 'quote' : 'quotes'}`;
    } else {
      this.displayedQuotes = newQuotes;
    }
  }
}
