import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCardTemplateComponent } from './contact-card-template.component';

describe('ContactCardTemplateComponent', () => {
  let component: ContactCardTemplateComponent;
  let fixture: ComponentFixture<ContactCardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCardTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
