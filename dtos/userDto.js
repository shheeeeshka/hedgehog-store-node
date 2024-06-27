export default class UserDto {
    id;
    name;
    surname;
    address;
    email;
    isActivated;
    role;

    constructor(model) {
        this.id = model.id;
        this.name = model.name || null;
        this.surname = model.surname || null;
        this.address = model.address || null;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.role = model.role;
    }
}