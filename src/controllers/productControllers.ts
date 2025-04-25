import { Request, Response } from 'express';
import db from '../db';
import { Product } from '../models/products';


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        const products = (rows as any[]).map(row => new Product(
           row.id, row.title, row.description, row.stock, row.price, row.image, row.created_date
        ));
        res.json(products);
    } catch {
        res.status(500).json({ error: 'Kunde inte hämta produkter' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if ((rows as any[]).length === 0) return res.status(404).json({ message: 'Produkt hittades inte' });
        const row = (rows as any)[0];
        const product = new Product(row.id, row.title, row.description, row.stock, row.price, row.image,
        row.created_date);
        res.json(product);
    }
    catch {
        res.status(500).json({ error: 'Kunde inte hämta produkt' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
      const { id, title, description, stock, price, image } = req.body;
      await db.query(
        'INSERT INTO products (id, title, description, stock, price, image, created_date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
        [id, title, description, stock, price, image]
      );
      res.status(201).json({ message: 'Produkt skapad' });
    } catch {
      res.status(500).json({ error: 'Kunde inte skapa produkt' });
    }
  };

  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const { id, title, description, stock, price, image } = req.body;
      await db.query(
        'UPDATE products SET id = ?, title = ?, description = ?, stock = ?, price = ?, image = ? WHERE id = ?',
        [id, title, description, stock, price, image, req.params.id]
      );
      res.json({ message: 'Produkt uppdaterad' });
    } catch {
      res.status(500).json({ error: 'Kunde inte uppdatera produkt' });
    }
  };

  export const deleteProduct = async (req: Request, res: Response) => {
    try {
      await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
      res.json({ message: 'Produkt raderad' });
    } catch {
      res.status(500).json({ error: 'Kunde inte radera produkt' });
    }
  };
  