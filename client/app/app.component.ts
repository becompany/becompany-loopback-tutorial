import { Component } from '@angular/core';
import {SurveyApi as SurveyService} from './lb-services';
import {VoteApi as VoteService} from './lb-services';
import {HTTP_PROVIDERS} from '@angular/http';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {SurveyListComponent} from './survey-list.component';
import {SurveyDetailComponent} from './survey-detail.component';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES],
  providers: [SurveyService, VoteService, HTTP_PROVIDERS, ROUTER_PROVIDERS],
  template: `
    <div class="text-center">
      <h1>{{title}}</h1>
      <p class="lead">{{description}}</p>
      
      <button class="btn btn-primary" [routerLink]="['Surveys']" *ngIf="!isSurveys()">View surveys</button>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})

@RouteConfig([
  {
    path: 'surveys',
    name: 'Surveys',
    component: SurveyListComponent
  },
  {
    path: 'survey/:id',
    name: 'SurveyDetail',
    component: SurveyDetailComponent
  }
])

export class AppComponent {

  title:string = 'Welcome to surveys page.';
  description:string = 'Here you can found the available surveys in the platform. Please take your time to fulfill, your opinion is very valuable.';

  constructor (
    private router:Router
  ){}

  isSurveys() {
    return this.router.isRouteActive(this.router.generate(['Surveys']));
  }
}

