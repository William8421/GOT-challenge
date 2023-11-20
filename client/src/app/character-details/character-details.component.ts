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

  constructor(private route: ActivatedRoute, private gotService: GotService) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe((params) => {
      // Get and assign the character slug from the route parameters
      this.characterSlug = params.get('slug') || '';

      // Load character details based on the slug
      this.getDetails();
    });
  }

  // Function to load character details with loading and error handling
  getDetails(): void {
    // Set loading to true before making the API call
    this.loading = true;

    // Call the service to get character details
    this.gotService
      .getCharacterDetails(this.characterSlug)
      .pipe(
        // Handle any errors that occur during the API call
        catchError((error: string) => {
          // Set the error message
          this.error =
            'Error loading character details. Please try again later.';
          // Return an empty object to continue the flow without stopping the application
          return of({});
        }),
        // Finalize block to run after the API call is completed (success or error)
        finalize(() => {
          // Set loading to false after the API call is completed
          this.loading = false;
        })
      )
      // Subscribe to the observable to get the result of the API call
      .subscribe((details) => {
        // Assign the fetched character details to the component property
        this.characterDetails = details[0];
      });
  }
}
