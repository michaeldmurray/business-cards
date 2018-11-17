import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  firstNameRef: Observable<any>;
  constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {
    this.searchHistoryRef = this.db.list(`currentSession/${this.loginService.userUid}/searches`);
    this.firstNameRef = this.db.list(`firstNames`).valueChanges();
    this.firstNameRef.subscribe((fnames: any) => {
      console.log(fnames);
    });
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }
}
