import {Component, Input, OnInit} from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import {Survey} from './survey';
import {SurveyApi as SurveyService} from './lb-services';
import {VoteApi as VoteService} from './lb-services';
import {Resource} from "./resource";
import { AcStars } from './components/stars';

@Component({
  selector: 'survey-detail',
  template: `
    <div *ngIf="survey">
      <h1 class="text-center">{{survey.topic | uppercase}}</h1>
      <p class="text-center" *ngIf="!hasBeenCompleted()">Please, fulfill the survey with your rates.</p>
      <p class="text-center" *ngIf="hasBeenCompleted()">Thanks for completing the survey. Your opinion is very valuable for us.</p>
      <div *ngFor="let resource of survey.resources">
        <div *ngIf="hasBeenRated(resource)" class="row">
          <div class="col-md-6 text-right">
            Your opinion for "{{resource.name}}":
          </div>
          <div class="col-md-6">
            <ac-stars [rating]="rates[resource.name].value" [disable]="true"></ac-stars>
          </div>
        </div>
        <div *ngIf="!hasBeenRated(resource)">
          <div class="col-md-6 text-right">
            What is your opinion for "{{resource.name}}"?
          </div>
          <div class="col-md-6">
            <ac-stars (rate)="handleRate($event, survey.id, resource.name)"></ac-stars>
          </div>
        </div>
      </div>
    </div>
    `,
    directives: [AcStars]
})

export class SurveyDetailComponent implements OnInit {
  @Input()
  survey: Survey;
  rates: Object = {};

  constructor(
    private surveyService: SurveyService,
    private voteService: VoteService,
    private routeParams: RouteParams
  ) {}

  ngOnInit() {
    let id = +this.routeParams.get('id');
    let context = this;
    this.surveyService.findById(id, {include: ['resources']}).subscribe(function(survey) {
      context.survey = survey;
      for (var resource of survey.resources) {
        context.voteService.find({
          where: {
            resource: resource.name,
            surveyId: id
          }
        }).subscribe(
          votes => {
            if(votes.length)
              context.rates[votes[0].resource] = votes[0];
          }
        );
      }
    });
  }

  hasBeenRated(resource:Resource) {
    return this.rates[resource.name];
  }

  hasBeenCompleted() {
    let result = true;
    for (var resource of this.survey.resources) {
      result = this.hasBeenRated(resource) && result;
    }
    return result;
  }

  handleRate(event, surveyId, resource) {
    let vote = {
      surveyId: surveyId,
      resource: resource,
      created: Date.now(),
      value: event
    };
    this.voteService.create(vote).subscribe(vote => this.rates[resource] = vote);
  }
}
