import { Component, OnInit } from '@angular/core';
import { History, HistoryService } from './history.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyList: Observable<History[]>;

  constructor(private historyService: HistoryService) {
    this.historyList = historyService.historyList;
  }

  ngOnInit() {
  }

}
