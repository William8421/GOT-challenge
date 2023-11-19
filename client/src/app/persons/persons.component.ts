import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GotService } from '../services/got.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
})
export class PersonsComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  searchQuery: string = '';

  constructor(private gotService: GotService, private router: Router) {}

  ngOnInit(): void {
    this.gotService.getCharacters().subscribe((characters) => {
      this.characters = characters;
      this.filteredCharacters = characters;
    });
  }
  // Function to filter characters based on the search query
  filterCharacters(): void {
    this.filteredCharacters = this.characters.filter((character) => {
      return character.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
    });
  }
}
