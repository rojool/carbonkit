import supabase from '$lib/db'
import {readable, get} from 'svelte/store'

export const Contacts = readable( null, (set) => {
    supabase
        .from('contacts')
        .select('*')
        .order('lastname', { ascending: true })
        .then(({error, data}) =>{
            if (error) throw new Error(error.message)
            set(data)
        })

    // add subscription to supabase logic
    const subscription = supabase
        .from('contacts')
        .on('INSERT', (payload) => {
            set([...get(Contacts), payload.new])
        })
        .on('DELETE', (payload) => {
            set(get(Contacts).filter(x =>{return x.id != payload.old.id}))
        })
        .subscribe()
  return () => supabase.removeSubscription(subscription)
})

export class Contact {

    constructor (id, gender, firstname, lastname, birthdate, email, type) {
        this.id = id;
        this.gender = gender ?? '';
        this.firstname = firstname ?? '';
        this.lastname = lastname ?? '';
        this.birthdate = birthdate ?? '';
        this.email = email ?? '';
        this.type = type ?? '';
    }

    getFullname() {
        return this.firstname + ' ' + this.lastname
    }

    async insert () {
        if (!this.gender || this.gender == '') throw new Error("Missing gender")
        if (!this.firstname || this.firstname.length < 1) throw new Error("Missing First name")
        if (!this.lastname || this.lastname.length < 1) throw new Error("Missing Last name")
        if (!this.birthdate || this.birthdate.length < 10) throw new Error("Missing birth date")
        if (!this.type || this.type == '') throw new Error("Missing contact type")
        delete this.id
        console.log(this)
        const { data, error } = await supabase
            .from('contacts')
            .insert([this])
        if (error) throw new Error(error.message)
        return data
    }

    static async deleteById (contactid) {
        if (!contactid || contactid.length < 0) throw new Error("Missing contact ID")
        const { data, error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', contactid)
        if (error) throw new Error(error.message)
        if (data.length == 0) throw Error("Error: No data has been deleted. Check row-level security for table \"contacts\", or check item still exists.")
        return data
    }

}