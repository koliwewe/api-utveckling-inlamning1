import  express, {Request, Response} from 'express';
import categoryRoutes from './routes/categoriesRoutes';
import productRoutes from './routes/productsRoutes';
import db from './db';



const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);


(async () => {
    try {
      const connection = await db.getConnection();
      console.log('✅ Databasen är ansluten!');
      connection.release();
    } catch (error) {
      console.error('❌ Kunde inte ansluta till databasen:', error);
    }
  })();

app.listen(PORT, () => {
    console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});


