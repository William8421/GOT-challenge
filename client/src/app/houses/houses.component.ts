import { Component, OnInit } from '@angular/core';
import { GotService } from '../services/got.service';
import { House } from '../Models';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements OnInit {
  houses: House[] = [];
  filteredHouses: House[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private gotService: GotService) {}

  // Initial fetch of houses when the component is initialized
  ngOnInit(): void {
    this.getHouses();
  }
  // Function to fetch houses with loading and error handling
  getHouses(): void {
    // Set loading to true before making the API call
    this.loading = true;

    // Call the service to get all houses
    this.gotService
      .getAllHouses()
      .pipe(
        // Handle any errors that occur during the API call
        catchError((error: string) => {
          this.error = 'Error loading houses. Please try again later.';
          // Return an empty array to continue the flow without stopping the application
          return of([]);
        }),
        // Finalize block to run after the API call is completed (success or error)
        finalize(() => {
          this.loading = false;
        })
      )
      // Subscribe to the observable to get the result of the API call
      .subscribe((houses) => {
        this.houses = houses;
        this.filteredHouses = houses;
      });
  }

  // Function to filter houses based on the search query
  filterHouses(): void {
    // Update the filteredHouses array using the filter method
    this.filteredHouses = this.houses.filter((house) => {
      // Check if the house name contains the search query (case-insensitive)
      return house.slug.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}
