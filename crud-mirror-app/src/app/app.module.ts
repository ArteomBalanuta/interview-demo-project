import { BrowserModule } from '@angular/platform-browser';
import {
  Compiler,
  COMPILER_OPTIONS,
  CompilerFactory,
  NgModule
} from '@angular/core';
import {JitCompilerFactory} from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { PersonItemComponent } from './person/person-item/person-item.component';
import { ContactCardTemplateComponent } from './person/contact-card-template/contact-card-template.component';
import { PeopleListComponent } from './person/people-list/people-list.component';
import { ContactCardComponent } from './person/contact-card/contact-card.component';
import { AddComponentComponent } from './person/add-component/add-component.component';
import {FormsModule} from '@angular/forms';
import {PersonService} from './service/person.service';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    PersonItemComponent,
    ContactCardTemplateComponent,
    PeopleListComponent,
    ContactCardComponent,
    AddComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PersonService,
    {
      provide: COMPILER_OPTIONS,
      useValue: {},
      multi: true
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS]
    },
    {
      provide: Compiler,
      useFactory: createCompiler,
      deps: [CompilerFactory]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
