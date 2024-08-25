const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'jorgeleonardosuarezcortes',
  host: 'localhost',
  database: 'web_stats',
  password: '', // Si tienes una contraseña, colócala aquí
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Ruta para guardar datos
app.post('/api/data', async (req, res) => {
  const { siteName, visits, loadTime, bounceRate, latitude, longitude } = req.body;
  try {
    const query = `
      INSERT INTO statistics (site_name, visit_count, avg_load_time, bounce_rate, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [siteName, visits, loadTime, bounceRate, latitude, longitude];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar los datos' });
  }
});

// Ruta para obtener datos del dashboard
app.get('/api/statistics', async (req, res) => {
  try {
    const query = `
   SELECT
    SUM(visit_count) AS total_visits,
    AVG(avg_load_time) AS average_load_time,
    AVG(bounce_rate) AS average_bounce_rate
FROM
    statistics;
`;

    const result = await pool.query(query);
    console.log(result)
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener los datos del dashboard:', err);
    res.status(500).json({ error: 'Error al obtener los datos del dashboard' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
