import { Router } from 'express';
import * as personController from '../controllers/personController';

const router: Router = Router();

router.get('/', personController.getAllPeople);
router.post('/', personController.createPerson);
router.put('/:id', personController.updatePerson);
router.delete('/:id', personController.deletePerson);
router.post('/bulk-delete', personController.bulkDeletePeople);
router.post('/undo-delete', personController.undoDeletePerson);

export default router;
