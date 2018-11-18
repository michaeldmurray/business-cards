import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { TextDetectionService } from '../text-detection.service';
import { Observable } from 'rxjs';
import { BusinessCard, BusinessCardsService } from '../business-card/business-cards.service';

/*
Note to professor: I've tried to keep my code organized by separating responsbilities into several services.
- BusinessCardsService is responsible for adding, updating and watching firebase cards list.
- TextDetectionService is responsible for making API calls to image parser and submitting resulting cards to be added.
- HistoryService is responsbile for adding and watching firebase history list.

Login and Dashboard services remain to handle login/logout and navigation.

I haven't followed the instructions to the letter in terms of where functions and objects should be stored. However,
I think this organization better follows the Single Responsibility Principle and makes the code a bit more readable.
*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  businessCards: BusinessCard[];
  searchResults: BusinessCard[];
  emailSearchText: String;
  nameSearchText: String;


  constructor(private dashboardService: DashboardService,
    private detectionService: TextDetectionService,
    private cardsService: BusinessCardsService) {
      this.cardsService.businessCards.subscribe(cards => this.businessCards = cards);
      this.cardsService.searchResults.subscribe(results => this.searchResults = results);
      this.emailSearchText = '';
      this.nameSearchText = '';
  }

  ngOnInit() {
  }

  onDetectionClick(): void {
    const imageUri =
    'https://d2slcw3kip6qmk.cloudfront.net/marketing/press/images/template-gallery/business-card-bold-impressions-01.jpg';
    // const imageUri =
    //   'https://lh3.googleusercontent.com/-sQsJlPZIPTc/ThwkpQeADtI/AAAAAAAAAuI/MWUH1I_7X0A/w530-h289-n/patrick-bateman-card.png';
    this.detectionService.textDetection(imageUri);
  }

  onSearchByEmail(): void {
    console.log('search was clicked: ' + this.emailSearchText);
    this.cardsService.searchByEmail(this.emailSearchText);
    this.emailSearchText = '';
  }

  onSearchByName(): void {
    console.log('search was clicked: ' + this.nameSearchText);
    this.cardsService.searchByName(this.nameSearchText);
    this.nameSearchText = '';
  }
}
