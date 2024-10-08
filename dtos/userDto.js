export default class UserDto {
    _id;
    email;
    address;
    activated;
    role;

    constructor(model) {
        this._id = model._doc._id;
        this.email = model._doc.email;
        this.address = model._doc.address;
        this.activated = model._doc.activated;
        this.role = model._doc.role;
    }
}