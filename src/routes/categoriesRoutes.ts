import express from "express";

import {
    getAllCategories,
    getProductsByCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/categoriesControllers';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id/products', getProductsByCategory);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;