import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies for this app
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'electric-offset',
      'electric-handle',
      'electric-schema',
    ],
}));

// Create a new pool using your Neon database connection string
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/', async (req, res) => {
  try {
    // Fetch books from your database using the postgres connection
    const { rows } = await pool.query('SELECT * FROM books_to_read;');
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch books', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});