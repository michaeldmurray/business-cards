import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { BusinessCard, BusinessCardsService } from './business-card/business-cards.service';
import { HistoryService } from './history/history.service';

@Injectable({
  providedIn: 'root'
})
export class TextDetectionService {

  constructor(private http: Http,
    private cardsService: BusinessCardsService,
    private historyService: HistoryService) { }

  textDetection(imageUri: String) {
    this.historyService.addHistory('User performed text detection on business card');
    const request: any = {
      'requests': [
        {
          'image': {
            'source': {
              'imageUri': imageUri
            },
          },
          'features': [
            {
              'type': 'TEXT_DETECTION',
              'maxResults': 1,
            }
          ]
        }
      ]
    };
    const url = `https://vision.googleapis.com/v1/images:annotate?key=${environment.CSC436}`;
    this.http.post(
      url,
      request
    ).subscribe( (results: any) => {
      const result: any = JSON.parse(results['_body'])['responses'][0]['fullTextAnnotation']['text'];
      console.log('RESULTS RESULTS RESULTS');
      console.log(result);
      console.log('RESULTS RESULTS RESULTS');
      const card: BusinessCard = {};
      card.email = this.findEmail(result);
      card.phoneNumber = this.findPhoneNumber(result);
      card.extraText = result;
      card.imageUri = imageUri;
      console.log(card);
      this.cardsService.addBusinessCard(card);
    });
  }


  findPhoneNumber(input: String): String {
    // add 'g' to end of pattern to indicate a global search, returning array
    const pattern: RegExp = /\d{3}\D{1}\d{3}\D{1}\d{4}/g;
    return this.findPattern(input, pattern).replace(/\D/g, '');
  }

  findEmail(input: String): String {
    const pattern: RegExp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    return this.findPattern(input, pattern);
  }

  findPattern(input: String, pattern: RegExp): String {
    const matches: Array<String> = input.match(pattern);
    return matches ? matches[0] : '';
  }
}
