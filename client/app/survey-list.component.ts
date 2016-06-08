import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import {SurveyApi as SurveyService} from './lb-services';
import {Survey} from './survey';

@Component({
  selector: 'survey-list',
  template: `
  <h1 class="centered">Available surveys</h1>
  <div class="container-list">
  <div *ngFor="let survey of surveys">
    <div [class.active]="survey.id === selectedSurveyId"
         class="survey-button btn btn-primary col-md-5 col-xs-12"
         (click)="onClick(survey)">
          <label>Survey topic: </label> <span>{{survey.topic | uppercase}}</span>
    </div>
  </div>
  </div>
  `,
  styles: [`
    .survey-button {
      margin-right: 8%;
      margin-top: 10px;
    }
`]
})

@Injectable()
export class SurveyListComponent implements OnInit {

  surveys:any = [];
  selectedSurvey:Survey;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  getSurveys() {
    this.surveyService.find().subscribe(surveys => this.surveys = surveys);
  }

  ngOnInit() {
    this.getSurveys();
  }

  onClick(survey:Survey) {
    let link = ['SurveyDetail', {id: survey.id}];
    this.router.navigate(link);
  }
}

