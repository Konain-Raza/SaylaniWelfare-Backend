import express from 'express';
import {
  registerBeneficiary,
  getBeneficiaryByToken,
  updateBeneficiaryStatus,
  addRemark,
  getAllBeneficiaries,
  deleteBeneficiary,
  updateBeneficiaryInfo,
} from '../controllers/beneficiaryControllers.js';

const router = express.Router();

router.post('/register', registerBeneficiary);
router.get('/:token', getBeneficiaryByToken);
router.patch('/status', updateBeneficiaryStatus);
router.patch('/remarks', addRemark);
router.get('/', getAllBeneficiaries);
router.delete('/:cnic', deleteBeneficiary);
router.put('/:cnic', updateBeneficiaryInfo);

export default router;
