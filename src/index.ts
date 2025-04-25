import  express, {Request, Response} from 'express';
import categoryRoutes;
import productRoutes;



const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servern körs på http://localhost:${PORT}`);
});


