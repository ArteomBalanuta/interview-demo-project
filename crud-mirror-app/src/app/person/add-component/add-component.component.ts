import {Component, OnInit} from '@angular/core';
import {Person} from "../model/person";
import {PersonService} from "../../service/person.service";

@Component({
  selector: 'app-add-component',
  templateUrl: './add-component.component.html',
  styleUrls: ['./add-component.component.css']
})
export class AddComponentComponent implements OnInit {
  private personService: PersonService;
  public person: Person;

  constructor(personService: PersonService) {
    this.personService = personService;
    this.person = new Person( '', '', -1, '',  '');
  }

  ngOnInit(): void {
  }

  setFirstName(value: string): void {
    this.person.firstName = value;
  }

  setLastName(value: string): void {
    this.person.lastName = value;
  }

  setGender(value: number): void {
    this.person.gender = value;
  }

  setEmail(value: string): void {
    this.person.email = value;
  }

  setPhone(value: string): void {
    this.person.phone = value;
  }

  addPerson(): void {
    const person = new Person(this.person.firstName, this.person.lastName, this.person.gender, this.person.email, this.person.phone);
    this.personService.addPerson(person);

    console.warn('AddComponentComponent: Added person ' + JSON.stringify(this.person));

    const data = JSON.parse('{ "operation": "add", "data": "" }');
    data.data = JSON.stringify(person);

    this.personService.publicMessage(JSON.stringify(data));
  }
}
