// Modules
import { Component, OnInit } from '@angular/core';
import { GotService } from '../services/got.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-house-members',
  templateUrl: './house-members.component.html',
  styleUrls: ['./house-members.component.scss'],
})
export class HouseMembersComponent implements OnInit {
  // Variables to store data
  houseSlug: string = '';
  houseMembers: any;
  backgroundImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gotService: GotService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.houseSlug = params.get('slug') || '';
      this.gotService.getHouse(this.houseSlug).subscribe((house) => {
        this.houseMembers = house[0].members;
      });
    });
    this.setBackgroundImage();
  }
  // Function to set the background image path
  setBackgroundImage(): void {
    this.backgroundImage = `../../assets/images/${this.houseSlug}-background.png`;
  }
}
