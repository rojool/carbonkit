import supabase from '$lib/db'

export class Company {
    constructor(name, numero_registre, numero_tva) {
        this.name = name ?? 'Acme'
        this.numero_registre = numero_registre ?? ''
        this.numero_tva = numero_tva ?? ''
    }

    static subscribe() {
        const subscription = supabase
            .from('companies')
            .on('*', payload => {
                return payload
            })
            .subscribe()
    }

    static async getAllCompanies() {
        const {data, error} = await supabase
            .from('companies')
            .select()
        if (error) throw new Error(error.message)
        return data
    }

    async insert () {
        if (!this.name || this.name.length < 1) return false
        const { data, error } = await supabase
            .from('companies')
            .insert([this])
        if (error) throw new Error(error.message)
        return data
    }

    static async deleteById (companyid) {
        if (!companyid || companyid.length < 0) return false
        const { data, error } = await supabase
            .from('companies')
            .delete()
            .match({'id': companyid})
        if (error) throw new Error(error.message)
        return data
    }

}