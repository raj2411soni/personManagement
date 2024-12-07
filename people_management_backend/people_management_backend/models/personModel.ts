import knex from 'knex';
import { Knex } from 'knex';
import dbConfig from '../db/knexfile';

const knexInstance: Knex = knex(dbConfig.development);

interface Person {
    id?: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: any;
    profile: string;
}
//ts-ignore
const getAllPeople = async (): Promise<Person[] | undefined> => {
    const people = await knexInstance('people').select('*');
    try {
        let addressArr: any = []

        for (const p of people) {
            const address = await knexInstance('addresses').where({ person_id: p.id }).select('*')
            for (const add of address) {
                if (add) {
                    addressArr.push(add.address)
                }
            }
            addressArr =[]
            p.address = address
        
        }
        return people 
    } catch (err) {
        console.log(err);     
    }
    
};

const getPersonById = async (id: number): Promise<Person | undefined> => {
    return knexInstance('people').where({ id }).first();
};

const createPerson = async (person: Person): Promise<number[]> => {
    return knexInstance('people').insert(person);
};

const updatePerson = async (id: number, person: Person): Promise<number> => {
    return knexInstance('people').where({ id }).update(person);
};

const deletePerson = async (id: number): Promise<number> => {
    return knexInstance('people').where({ id }).del();
};

const bulkDeletePeople = async (ids: number[]): Promise<void> => {
    return knexInstance('people').whereIn('id', ids).del();
};

export { getAllPeople, getPersonById, createPerson, updatePerson, deletePerson, bulkDeletePeople };
