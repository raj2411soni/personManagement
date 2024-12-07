import knex from 'knex';
import { Knex } from 'knex';
import dbConfig from '../db/knexfile';

const knexInstance: Knex = knex(dbConfig.development);

interface Address {
    id?: number;
    person_id: number;
    address: string;
    is_primary?: boolean;
    created_at?: Date;
    updated_at?: Date;
}


const getAllAddresses = async (): Promise<Address[] | Error> => {
    try {
        const addresses = await knexInstance('addresses').select('*');
        return addresses;
    } catch (err:any) {
        return new Error('Error fetching addresses: ' + err.message);
    }
};


const getAddressById = async (id: number): Promise<Address | Error> => {
    try {
        const address = await knexInstance('addresses').where({ id }).first();
        if (!address) {
            return new Error(`Address with ID ${id} not found`);
        }
        return address;
    } catch (err:any) {
        return new Error(`Error fetching address with ID ${id}: ${err.message}`);
    }
};


const createAddress = async (address: Address): Promise<number[] | Error> => {
    try {
        const id = await knexInstance('addresses').insert(address);
        return id;
    } catch (err:any) {
        return new Error('Error creating address: ' + err.message);
    }
};


const updateAddress = async (id: number, address: Address): Promise<number | Error> => {
    try {
        const rowsAffected = await knexInstance('addresses').where({ id }).update(address);
        if (rowsAffected === 0) {
            return new Error(`Address with ID ${id} not found`);
        }
        return rowsAffected;
    } catch (err:any) {
        return new Error(`Error updating address with ID ${id}: ${err.message}`);
    }
};


const deleteAddress = async (id: number): Promise<number | Error> => {
    try {
        const rowsAffected = await knexInstance('addresses').where({ id }).del();
        if (rowsAffected === 0) {
            return new Error(`Address with ID ${id} not found`);
        }
        return rowsAffected;
    } catch (err:any) {
        return new Error(`Error deleting address with ID ${id}: ${err.message}`);
    }
};


const bulkDeleteAddresses = async (ids: number[]): Promise<void | Error> => {
    try {
        const rowsAffected = await knexInstance('addresses').whereIn('id', ids).del();
        if (rowsAffected === 0) {
            return new Error('No addresses were deleted. IDs may not exist.');
        }
    } catch (err:any) {
        return new Error('Error bulk deleting addresses: ' + err.message);
    }
};

export {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    bulkDeleteAddresses,
};
