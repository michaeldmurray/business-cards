import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface History {
  description: String;
  timestamp: String;
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historyRef: AngularFireList<History>;
  historyList: Observable<History[]>;

  constructor(private db: AngularFireDatabase) {
    this.historyRef = this.db.list('history');
    this.historyList = this.historyRef.valueChanges();
  }

  addHistory(description: String): void {
    const history: History = {
      description: description,
      timestamp: new Date().toUTCString()
    };
    this.historyRef.push(history);
  }
}
