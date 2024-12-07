
let deletedPeople: any[] = [];

const addToUndoStack = (person: any): void => {
    deletedPeople.push(person);
};

const getDeletedPeople = (): any[] => {
    return deletedPeople;
};

const popDeletedPerson = (): any => {
    return deletedPeople.pop();
};

export { addToUndoStack, getDeletedPeople, popDeletedPerson };
