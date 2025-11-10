const express = require('express');
const { approveEscort, rejectEscort } = require('../../controllers/Admin/AdminApproveEscort');
const router = express.Router()

router.patch('/approveescort/:id', approveEscort);
router.patch('/rejectescort/:id', rejectEscort);

module.exports = router 