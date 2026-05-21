import express from 'express';
import {
  createEntry, getEntries, getEntry,
  updateEntry, deleteEntry, searchEntries
} from '../controllers/entryControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
 
router.get('/search',protect, searchEntries);

router.route('/')
  .post(protect, createEntry)
  .get(protect, getEntries);

router.route('/:id')
  .get(protect, getEntry)
  .patch(protect, updateEntry)
  .delete(protect, deleteEntry);
  
export default router;

