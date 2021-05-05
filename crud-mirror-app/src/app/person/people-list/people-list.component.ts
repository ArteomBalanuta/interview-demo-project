import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from '../model/person';
import {PersonService} from '../../service/person.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit, OnDestroy {
  private personService: PersonService;
  private subscription: Subscription;

  public persons: Person[] = [];

  public operation: string;
  public data: string;

  constructor(personService: PersonService) {
    this.personService = personService;
  }

  //TODO: move to service
  private localStorageListener = (e) => {
    if (e.key === 'operation' && e.oldValue === null && e.newValue !== null) {
      console.log("saving operation: " + e.newValue);

      this.operation = e.newValue;
      localStorage.removeItem('operation');
    }

    if (e.key === 'data' && e.oldValue === null && e.newValue !== null) {
      console.log("saving data: " + e.newValue);

      this.data = e.newValue;
      localStorage.removeItem('data');

      console.log("object " + this.data);

      const p = JSON.parse(this.data);
      console.warn(JSON.stringify(p));
      const person = new Person(p.firstName, p.lastName, p.gender, p.email, p._phone);
      person.id = p.id;
      person.template = p.template;

      this.personService.addPerson(person);
    }
  }

  ngOnInit(): void {
    this.subscription = this.personService.currentMessage.subscribe(persons => {
      if (this.isNotEmpty(persons)) {
        this.persons = persons;
      }
    });

    if (window.addEventListener) {
      window.addEventListener('storage', this.localStorageListener, false);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    window.removeEventListener('storage', (event) => this.localStorageListener, false);
  }

  isNotEmpty(arr: Person[]): boolean {
    return arr.length !== 0;
  }
}
