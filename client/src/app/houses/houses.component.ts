import { Component, OnInit } from '@angular/core';
import { GotService } from '../services/got.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements OnInit {
  houses: any[] = [];
  filteredHouses: any[] = [];
  searchQuery: string = '';

  constructor(private gotService: GotService) {}

  ngOnInit(): void {
    this.gotService.getAllHouses().subscribe((houses) => {
      this.houses = houses;
      this.filteredHouses = houses;
    });
  }
  // Function to filter houses based on the search query
  filterHouses(): void {
    this.filteredHouses = this.houses.filter((house) => {
      return house.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}
