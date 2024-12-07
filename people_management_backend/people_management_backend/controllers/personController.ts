import { Request, Response } from 'express';
import * as personModel from '../models/personModel';
import * as undoDelete from '../src/utils/undoDelete';

let deletedPeople: any[] = []; 


const getAllPeople = async (req: Request, res: Response): Promise<void> => {
    try {
        const people = await personModel.getAllPeople();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching people', error });
    }
};


const createPerson = async (req: Request, res: Response): Promise<void> => {
    try {
        const person = req.body;
        const [id] = await personModel.createPerson(person);
        res.status(201).json({ id, ...person });
    } catch (error) {
        res.status(500).json({ message: 'Error creating person', error });
    }
};

const updatePerson = async (req: Request, res: Response): Promise<any> => {
    try {
        const updated = await personModel.updatePerson(Number(req.params.id), req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json({ message: 'Person updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating person', error });
    }
};


const deletePerson = async (req: Request, res: Response): Promise<any> => {
    try {
        const personId = Number(req.params.id);
        const person = await personModel.getPersonById(personId);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }


        deletedPeople.push(person);
        await personModel.deletePerson(personId);

        res.status(200).json({ message: 'Person deleted', person });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting person', error });
    }
};

const undoDeletePerson = async (req: Request, res: Response): Promise<any> => {
    try {
        if (deletedPeople.length === 0) {
            return res.status(404).json({ message: 'No deleted persons to restore' });
        }

        let lastDeleted;

        if (deletedPeople.length === 1) {
            lastDeleted = deletedPeople.pop();
            if (!lastDeleted) {
                return res.status(400).json({ message: 'Failed to retrieve the last deleted person' });
            }

            await personModel.createPerson(lastDeleted); 
            return res.status(200).json({ message: 'Undo single delete successful', person: lastDeleted });
        }

        const peopleToRestore = deletedPeople.splice(0, deletedPeople.length); 
        if (!peopleToRestore.length) {
            return res.status(400).json({ message: 'No people to restore' });
        }


        const errors: string[] = [];
        const restoredPeople = [];

        for (const person of peopleToRestore) {
            try {
                await personModel.createPerson(person);
                restoredPeople.push(person);
            } catch (error) {
                console.error(`Error restoring person with ID ${person.id}:`, error);
                errors.push(`Error restoring person with ID ${person.id}`);
            }
        }

        if (restoredPeople.length > 0) {
            return res.status(200).json({ message: 'Undo bulk delete successful', people: restoredPeople, errors });
        } else {
            return res.status(500).json({ message: 'Error undoing bulk delete', errors });
        }
    } catch (error) {
        console.error('Unexpected error during undo operation:', error);
        res.status(500).json({ message: 'Error undoing delete', error });
    }
};


const bulkDeletePeople = async (req: Request, res: Response): Promise<void> => {
    try {
        const ids: number[] = req.body.ids;

        const peopleToDelete = []
        // @ts-ignore
        for (const id of ids) {
            peopleToDelete.push(await personModel.getPersonById(id))
        }

        //@ts-ignore
        if (peopleToDelete.length === 0) {
            //@ts-ignore
            return res.status(404).json({ message: 'No people found to delete' });
        }

        //@ts-ignore

        for (const people of peopleToDelete) {
            deletedPeople.push(people)
        }

        await personModel.bulkDeletePeople(ids);

        res.status(200).json({ message: 'Bulk delete successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting people', error });
    }
};


export { getAllPeople, createPerson, updatePerson, deletePerson, undoDeletePerson, bulkDeletePeople };
