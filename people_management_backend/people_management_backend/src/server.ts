import express from 'express';
import cors from 'cors';
import personRoutes from '../routes/personRoutes';
import addressRoutes from '../routes/addressRoutes'
const app = express();

app.use(express.json());
app.use(cors());

app.use('/people', personRoutes);
app.use('/address', addressRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
