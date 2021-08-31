import supabase from '$lib/db';

export class Contact {

    constructor (id, gender, firstname, lastname, birthdate, email, type) {
        this.id = id;
        this.gender = gender;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.email = email;
        this.type = type;
    }

    getFullname() {
        return this.firstname + ' ' + this.lastname;
    }

    async insert(contact) {
        try {
            return true
        } catch (error) {
            return false
        }
    }

    async update() {
        try {
            return true
        } catch (error) {
            return false
        }
    }

    async delete() {
        try {
            return true
        } catch (error) {
            return false
        }
    }

}