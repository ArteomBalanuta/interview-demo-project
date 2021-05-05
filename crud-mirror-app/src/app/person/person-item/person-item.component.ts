import {
  Component,
  Compiler,
  ViewContainerRef,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  NgModule,
  ComponentRef,
  Injector, NgModuleRef, ViewChild
} from '@angular/core';
import {Person} from '../model/person';
import {PersonService} from "../../service/person.service";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnInit, OnDestroy {
  private personService: PersonService;

  @Input()
  public person: Person;

  private subscription: Subscription;

  public persons: Person[] = [];

  constructor(personService: PersonService) {
    this.personService = personService;
  }

  ngOnInit(): void {
    this.subscription = this.personService.currentMessage.subscribe(persons => {
      if (this.isNotEmpty(persons)) {
        this.persons = persons;
      }
    });
  }

  displayContactCard(): void {
    this.person.isCurrentTemplateActive = true;

    /* I admit not the best place for this code */
    this.persons.forEach(person => {
      if (person.id !== this.person.id) {
        person.isCurrentTemplateActive = false;
      }
    });

    console.log('PersonItemComponent: refreshed contact card: ' + JSON.stringify(this.person));
  }

  isNotEmpty(arr: Person[]): boolean {
    return arr.length !== 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
