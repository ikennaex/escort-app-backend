const express = require('express');
const { approveEscort } = require('../../controllers/Admin/AdminApproveEscort');
const router = express.Router()

router.patch('/approveescort/:id', approveEscort);

module.exports = router 