import supabase from '$lib/db';

export class Contact {

    constructor (id, gender, firstname, lastname, birthdate, email, type) {
        this.id = id;
        this.gender = gender ?? '';
        this.firstname = firstname ?? '';
        this.lastname = lastname ?? '';
        this.birthdate = birthdate ?? '01/01/1970';
        this.email = email ?? '';
        this.type = type ?? '';
    }

    getFullname() {
        return this.firstname + ' ' + this.lastname;
    }

    static async getContacts () {
        const mySubscription = supabase
            .from('contacts')
            .on('*', payload => {
                console.log('Change received!', payload)
            })
            .subscribe()
        return mySubscription
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