class Person {
    static sId = 0;
    id;
    firstName;
    lastName;
    gender;
    email;
    phone;
    template;

    // TODO: fix ¯\_(ツ)_/¯
    constructor(id, firstName, lastName, gender, email, phone, template) {
        if (id !== null) {
            this.id = id;
        } else {
            this.id = Person.sId;
        }

        this.firstName = firstName;
        this.lastName = lastName;

        this.gender = gender;
        this.email = email;
        this.phone = phone;

        if (template !== null) {
            this.template = template;
        } else {
            this.template = '<h2>{{person.firstName}}</h2>';    /* Default template */
        }

        Person.sId += 1;
    }
    //TODO: use this builder instead of raw constructor calls
    static fromObject(obj) {
        return new Person(obj.id, obj.firstName, obj.lastName, obj.gender, obj.email, obj.phone, obj.template);
    }
}
