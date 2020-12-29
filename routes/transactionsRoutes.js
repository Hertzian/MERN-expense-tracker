const express = require('express')
const transactionsController = require('../controllers/transactionsController')
const router = express.Router()

router.get('/', transactionsController.getTransactions)
router.post('/', transactionsController.addTransaction)
router.delete('/:id', transactionsController.deleteTransaction)

module.exports = router
