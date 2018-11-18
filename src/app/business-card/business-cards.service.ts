import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HistoryService } from '../history/history.service';

export interface BusinessCard {
  firstName?: String;
  lastName?: String;
  email?: String;
  phoneNumber?: String;
  extraText?: String;
  imageUri?: String;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessCardsService {
  cardsRef: AngularFireList<BusinessCard>;
  businessCards: Observable<BusinessCard[]>;
  searchResults: Observable<BusinessCard[]>;

  constructor(private db: AngularFireDatabase,
    private historyService: HistoryService) {
    this.cardsRef = this.db.list('businessCards');
    this.businessCards = this.cardsRef.valueChanges();
  }

  addBusinessCard(card: BusinessCard): void {
    this.cardsRef.push(card);
  }

  searchByEmail(search: String): void {
    this.historyService.addHistory('User searched cards by email: ' + search);
    this.searchResults = this.businessCards.pipe(
      filter((card: BusinessCard) => card.email === search)
    );
  }
}
