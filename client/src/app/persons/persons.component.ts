import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GotService } from '../services/got.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Person } from '../Models';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
})
export class PersonsComponent implements OnInit {
  characters: Person[] = [];
  filteredCharacters: Person[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private gotService: GotService, private router: Router) {}

  ngOnInit(): void {
    // Initial fetch of characters when the component is initialized
    this.getPersons();
  }

  // Function to fetch characters with loading and error handling
  getPersons(): void {
    // Set loading to true before making the API call
    this.loading = true;

    // Call the service to get all characters
    this.gotService
      .getCharacters()
      .pipe(
        // Handle any errors that occur during the API call
        catchError((error: string) => {
          // Set the error message
          this.error = 'Error loading characters. Please try again later.';
          // Return an empty array to continue the flow without stopping the application
          return of([]);
        }),
        // Finalize block to run after the API call is completed (success or error)
        finalize(() => {
          // Set loading to false after the API call is completed
          this.loading = false;
        })
      )
      // Subscribe to the observable to get the result of the API call
      .subscribe((characters) => {
        // Assign the fetched characters to both the main and filtered arrays
        this.characters = characters;
        this.filteredCharacters = characters;
      });
  }

  // Function to filter characters based on the search query
  filterCharacters(): void {
    // Update the filteredCharacters array using the filter method
    this.filteredCharacters = this.characters.filter((character) => {
      // Check if the character name contains the search query (case-insensitive)
      return character
        .name!.toLowerCase()
        .includes(this.searchQuery.toLowerCase());
    });
  }
}
