import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
  searchResults: Subject<BusinessCard[]>;

  constructor(private db: AngularFireDatabase,
    private historyService: HistoryService) {
    this.cardsRef = this.db.list('businessCards');
    this.businessCards = this.cardsRef.valueChanges();
    this.searchResults = new Subject<BusinessCard[]>();
  }

  addBusinessCard(card: BusinessCard): void {
    this.cardsRef.push(card);
  }

  searchByEmail(search: String): void {
    this.historyService.addHistory('User searched cards by email: ' + search);
    this.cardsRef.valueChanges().pipe(
      map(cards => cards.filter((card: BusinessCard) => {
        return card.email === search;
      }))
    ).subscribe(results => this.searchResults.next(results));
  }

  searchByName(search: String): void {
    this.historyService.addHistory('User searched cards by name: ' + search);
    this.cardsRef.valueChanges().pipe(
      map(cards => cards.filter((card: BusinessCard) => {
        const loweredSearch = search.toLowerCase();
        const loweredFirst = card.firstName.toLowerCase();
        const loweredLast = card.lastName.toLowerCase();
        const loweredFull = `${loweredFirst} ${loweredLast}`;
        return (loweredFirst === loweredSearch ||
                loweredLast === loweredSearch ||
                loweredFull === loweredSearch);
      }))
    ).subscribe(results => this.searchResults.next(results));
  }
}
