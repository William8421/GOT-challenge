import { Component, OnInit } from '@angular/core';
import { GotService } from '../services/got.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseMember } from '../Models';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-house-members',
  templateUrl: './house-members.component.html',
  styleUrls: ['./house-members.component.scss'],
})
export class HouseMembersComponent implements OnInit {
  houseSlug: string = '';
  houseMembers: HouseMember[] = [];
  backgroundImage: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gotService: GotService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe((params) => {
      // Get and assign the house slug from the route parameters
      this.houseSlug = params.get('slug') || '';

      // Load house members based on the slug
      this.loadHouseMembers();
    });

    // Set the background image path
    this.setBackgroundImage();
  }

  // Function to load house members with loading and error handling
  loadHouseMembers(): void {
    // Set loading to true before making the API call
    this.loading = true;

    // Call the service to get house members
    this.gotService
      .getHouse(this.houseSlug)
      .pipe(
        // Handle any errors that occur during the API call
        catchError((error: string) => {
          // Set the error message
          this.error = 'Error loading house members. Please try again later.';
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
      .subscribe((house) => {
        // Assign the fetched house members to the component property
        this.houseMembers = house[0]?.members || [];
      });
  }

  // Function to set the background image path
  setBackgroundImage(): void {
    this.backgroundImage = `../../assets/images/${this.houseSlug}-background.png`;
  }
}
