import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Person} from '../model/person';

@Component({
  selector: 'app-contact-card-template',
  templateUrl: './contact-card-template.component.html',
  styleUrls: ['./contact-card-template.component.css']
})
export class ContactCardTemplateComponent implements OnInit, OnDestroy {
  @Input()
  public person: Person;
  public template: string;

  constructor() {
  }

  ngOnInit(): void {
    this.template = this.person.template;
  }

  ngOnDestroy(): void {
  }

  saveTemplate(): void {
    this.person.template = this.template;
    console.log('ContactCardTemplateComponent: saved template for user: ' + JSON.stringify(this.person));
  }
}
