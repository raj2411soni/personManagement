import { Request, Response } from 'express';
import * as addressService from '../models/adressModel'; 

export const getAllAddresses = async (req: Request, res: Response): Promise<Response> => {
    try {
        const addresses = await addressService.getAllAddresses();
        return res.status(200).json(addresses);
    } catch (err: any) {
        console.error('Error fetching addresses:', err.message);
        return res.status(500).json({ message: 'Failed to fetch addresses', error: err.message });
    }
};

export const getAddressById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID provided' });
    }

    try {
        const address = await addressService.getAddressById(id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        return res.status(200).json(address);
    } catch (err: any) {
        console.error(`Error fetching address with ID ${id}:`, err.message);
        return res.status(500).json({ message: 'Failed to fetch the address', error: err.message });
    }
};

export const createAddress = async (req: Request, res: Response): Promise<Response> => {
    const { person_id, address, is_primary } = req.body;

    if (!person_id || !address) {
        return res.status(400).json({ message: 'Person ID and address are required' });
    }

    try {
        const newAddress = await addressService.createAddress({ person_id, address, is_primary });
//@ts-ignore
        return res.status(201).json({ id: newAddress[0], message: 'Address created successfully' });
    } catch (err: any) {
        console.error('Error creating address:', err.message);
        return res.status(500).json({ message: 'Failed to create address', error: err.message });
    }
};

export const updateAddress = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id, 10);
    const { address, is_primary } = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID provided' });
    }

    try {
       // @ts-ignore
        const updatedCount = await addressService.updateAddress(id, { address, is_primary });

        if (updatedCount === 0) {
            return res.status(404).json({ message: 'Address not found' });
        }

        return res.status(200).json({ message: 'Address updated successfully' });
    } catch (err: any) {
        console.error(`Error updating address with ID ${id}:`, err.message);
        return res.status(500).json({ message: 'Failed to update address', error: err.message });
    }
};

export const deleteAddress = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID provided' });
    }

    try {
        const deletedCount = await addressService.deleteAddress(id);

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Address not found' });
        }

        return res.status(200).json({ message: 'Address deleted successfully' });
    } catch (err: any) {
        console.error(`Error deleting address with ID ${id}:`, err.message);
        return res.status(500).json({ message: 'Failed to delete address', error: err.message });
    }
};

export const bulkDeleteAddresses = async (req: Request, res: Response): Promise<Response> => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.some((id: any) => isNaN(parseInt(id, 10)))) {
        return res.status(400).json({ message: 'Invalid IDs provided' });
    }

    try {
        await addressService.bulkDeleteAddresses(ids);
        return res.status(200).json({ message: 'Addresses deleted successfully' });
    } catch (err: any) {
        console.error('Error bulk deleting addresses:', err.message);
        return res.status(500).json({ message: 'Failed to bulk delete addresses', error: err.message });
    }
};
