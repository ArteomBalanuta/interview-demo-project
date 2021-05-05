import {Component, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewRef} from '@angular/core';
import {Person} from "../model/person";
import {PersonService} from "../../service/person.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit, OnDestroy {
  @Input()
  public person: Person;
  private personService: PersonService;

  @ViewChild('contactCard', { read: ViewContainerRef, static: true })
  private contactCardContainerRef: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  private subscription: Subscription;

  public persons: Person[] = [];

  constructor(personService: PersonService) {
    this.personService = personService;
  }

  ngOnInit(): void {
    this.subscription = this.personService.currentMessage.subscribe(persons => {
      if (this.isNotEmpty(persons)) {
        this.persons = persons;
    }});
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.displayContactCardWithAppliedTemplate();
  }

  displayContactCardWithAppliedTemplate(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.compileTemplate(this.person);
  }

  private async compileTemplate(person: Person): Promise<void> {
    this.componentRef = await this.personService.compileTemplate(person);

    const personCopied = new Person(person.firstName, person.lastName, person.gender, person.email, person.phone);
    this.componentRef.instance.person = personCopied;
    this.contactCardContainerRef.insert(this.componentRef.hostView);

    console.log('ContactCardComponent: compiled template for ' + JSON.stringify(this.person));
  }

  isNotEmpty(arr: Person[]): boolean {
    return arr.length !== 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
