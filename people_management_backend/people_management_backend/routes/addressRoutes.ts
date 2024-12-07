import { Router } from 'express';
import * as addressController from '../controllers/addressController';

const router: Router = Router();

//@ts-ignore
router.get('/', addressController.getAllAddresses);

//@ts-ignore
router.get('/:id', addressController.getAddressById);

//@ts-ignore
router.post('/', addressController.createAddress);

//@ts-ignore
router.put('/:id', addressController.updateAddress);

//@ts-ignore
router.delete('/:id', addressController.deleteAddress);

//@ts-ignore
router.post('/bulk-delete', addressController.bulkDeleteAddresses);

export default router;
