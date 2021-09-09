import supabase from '$lib/db'
import {readable, get} from 'svelte/store'

export const Companies = readable( null, (set) => {
    supabase
        .from('companies')
        .select('*')
        .order('name', { ascending: true })
        .then(({error, data}) =>{
            if (error) throw new Error(error.message)
            set(data)
        })

    // add subscription to supabase logic
    const subscription = supabase
        .from('companies')
        .on('INSERT', (payload) => {
            set([...get(Companies), payload.new])
        })
        .on('DELETE', (payload) => {
            set(get(Companies).filter(x =>{return x.id != payload.old.id}))
        })
        .subscribe()
  return () => supabase.removeSubscription(subscription)
})

export class Company {

    constructor(name, numero_registre, numero_tva) {
        this.name = name ?? 'Acme'
        this.numero_registre = numero_registre ?? ''
        this.numero_tva = numero_tva ?? ''
    }

    async insert () {
        if (!this.name || this.name.length < 1) return
        const { data, error } = await supabase
            .from('companies')
            .insert([this])
        if (error) throw new Error(error.message)
        return data
    }

    static async deleteById (companyid) {
        if (!companyid || companyid.length < 0) return
        const { data, error } = await supabase
            .from('companies')
            .delete()
            .eq('id', companyid)
        if (error) throw new Error(error.message)
        if (data.length == 0) throw Error("Error: No data has been deleted. Check row-level security for table \"companies\", or check item still exists.")
        return data
    }

}