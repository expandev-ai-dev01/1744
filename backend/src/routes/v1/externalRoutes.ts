import { Router } from 'express';
import * as vehicleController from '@/api/v1/external/vehicle/controller';
import * as vehicleDetailController from '@/api/v1/external/vehicle/detail/controller';
import * as contactFormController from '@/api/v1/external/contact-form/controller';

const router = Router();

router.get('/vehicle', vehicleController.listHandler);
router.get('/vehicle/:id', vehicleDetailController.getHandler);
router.post('/contact-form', contactFormController.postHandler);

export default router;
