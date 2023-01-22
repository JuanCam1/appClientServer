const { Router } = require('express');
const {
  getClientsAll,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require('../controllers/client');

const router = Router();

router.get('/getClientsAll', getClientsAll);
router.get('/getClientById/:id', getClientById);
router.post('/createClient', createClient);
router.put('/updateClient/:id', updateClient);
router.delete('/deleteClient/:id', deleteClient);

module.exports = router;
