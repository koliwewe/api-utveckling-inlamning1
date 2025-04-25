import { Request, Response } from 'express';
import db from '../db';
import { Category } from '../models/categories';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM categories');
        const categories = (rows as any[]).map(row => new Category(row.id, row.name));
        res.json(categories);
    } catch {
        res.status(500).json({error: 'Kunde inte hämta kategorier'});
    }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE category_id = ?', [req.params.id]);
        res.json(rows);
    } catch {
        res.status(500).json({ error: 'Kunde inte hämta produkter' });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
        res.status(201).json({ message: 'Kategori skapad' });
    } catch {
        res.status(500).json({error: 'Kunde inte skapa kategori'});
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id]);
        res.json({message: 'Kategori uppdaterat'});
    } catch {
        res.status(500).json({ error: 'Kunde inte uppdatera kategori' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ message: 'Kategori raderad' });
    } catch {
        res.status(500).json({ error: 'Kunde inte radera kategori' });
    }
};