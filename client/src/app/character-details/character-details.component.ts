import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GotService } from '../services/got.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
  characterSlug: string = '';
  characterDetails: any = {};

  constructor(private route: ActivatedRoute, private gotService: GotService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.characterSlug = params.get('slug') || '';
      this.gotService
        .getCharacterDetails(this.characterSlug)
        .subscribe((details) => {
          this.characterDetails = details[0];
        });
    });
  }
}
