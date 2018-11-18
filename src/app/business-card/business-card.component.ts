import { Component, OnInit, Input } from '@angular/core';
import { BusinessCard } from './business-cards.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {
  @Input() businessCard: BusinessCard;
  private externalImage: boolean;

  constructor() { }

  ngOnInit() {
    this.externalImage = this.businessCard.imageUri && this.businessCard.imageUri.startsWith('http');
    console.log(this.businessCard.imageUri);
    console.log(this.externalImage);
  }

}
