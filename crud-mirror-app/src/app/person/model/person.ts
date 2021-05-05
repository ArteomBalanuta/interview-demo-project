export class Person {
  public static sId = 0;

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _gender: number;
  private _email: string;
  private _phone: string;
  private _template: string;
  private _isCurrentTemplateActive: boolean;

  get isCurrentTemplateActive(): boolean {
    return this._isCurrentTemplateActive;
  }

  set isCurrentTemplateActive(value: boolean) {
    this._isCurrentTemplateActive = value;
  }

  constructor(firstName: string, lastName: string, gender: number, email: string, phone: string) {
    this._id = Person.sId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._gender = gender;
    this._email = email;
    this._phone = phone;

    /* Default template */
    this._template =  '<h2>{{person.firstName}}</h2>';
    Person.sId += 1;
  }


  set id(value: number) {
    this._id = value;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  set gender(value: number) {
    this._gender = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get gender(): number {
    return this._gender;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get template(): string {
    return this._template;
  }

  set template(value: string) {
    this._template = value;
  }
}
