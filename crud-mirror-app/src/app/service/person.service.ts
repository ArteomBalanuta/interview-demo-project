import {Compiler, Component, ComponentRef, Injectable, Injector, NgModule, NgModuleRef, OnInit} from '@angular/core';

import {BehaviorSubject, Observable, of} from 'rxjs';
import {Person} from '../person/model/person';
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private compiler: Compiler;
  private injector: Injector;
  private moduleRef: NgModuleRef<any>;

  private static persons: Person[] = [];

  private messageSource = new BehaviorSubject( []);

  currentMessage = this.messageSource.asObservable();

  private remoteWindow: Window;

  public publicMessage(data: string): void {
    this.remoteWindow = window.frames[0];

    const message = data;
    this.remoteWindow.postMessage(message, 'http://localhost:8081/app/');
    console.log('send: ' + message);
  }

  addPerson(message: Person): void {
    PersonService.persons.push(message);

    this.messageSource.next(PersonService.persons);
  }

  constructor(compiler: Compiler, injector: Injector, public sanitizer: DomSanitizer) {
    this.compiler = compiler;
    this.injector = injector;

    window.addEventListener('message', (event) => this.processIncomingMessage(event), false);
  }

  processIncomingMessage(event: MessageEvent<any>): void {
    if (event.origin !== window.origin) {

      console.log("data: " + event.data);

      var response = JSON.parse(event.data);

      var responseOperation = response.operation;
      var responseDataObj = JSON.parse(response.data);

      console.log("Operation received: " + responseOperation);
      console.log("For person: " + JSON.stringify(responseDataObj));

      localStorage.setItem('operation', responseOperation);
      localStorage.setItem('data', JSON.stringify(responseDataObj));
    }
  }

  print(event: any): void {
    console.log(event);
  }

  public async compileTemplate(person: Person): Promise<ComponentRef<any>> {
    const templateHTML = person.template.toString();
    console.log('PersonService: creating component for template: ' + templateHTML);
    const component = Component({ template: templateHTML})(class { });
    const module = NgModule({ imports: [CommonModule], declarations: [component] })(class { });

    return new Promise(resolve => {
      this.compiler.compileModuleAndAllComponentsAsync(module)
        .then(factories => { resolve(factories.componentFactories[0]
            .create(
              this.injector,
              [],
              null,
              this.moduleRef));
        });
    });
  }
}
