const { Pool } = require('pg');

const pool = new Pool({
  user: 'jorgeleonardosuarezcortes',
  host: 'localhost',
  database: 'web_stats',
  password: '',
  port: 5432,
});

exports.handler = async (event) => {
  let responseMessage = '';
  const statusCode = 200;

  try {
    const method = event.httpMethod;
    const { siteName, visits, loadTime, bounceRate, latitude, longitude, id } = JSON.parse(event.body || '{}');

    switch (method) {
      case 'POST':
        const queryPost = `
          INSERT INTO statistics (site_name, visit_count, avg_load_time, bounce_rate, latitude, longitude)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const valuesPost = [siteName, visits, loadTime, bounceRate, latitude, longitude];
        const resultPost = await pool.query(queryPost, valuesPost);
        responseMessage = JSON.stringify(resultPost.rows[0]);
        break;
      
      case 'GET':
        if (event.queryStringParameters && event.queryStringParameters.stats) {
          const queryGetStats = `
            SELECT
              SUM(visit_count) AS total_visits,
              AVG(avg_load_time) AS average_load_time,
              AVG(bounce_rate) AS average_bounce_rate
            FROM statistics;
          `;
          const resultGetStats = await pool.query(queryGetStats);
          responseMessage = JSON.stringify(resultGetStats.rows[0]);
        } else {
          const queryGet = `
            SELECT * FROM statistics
            ${id ? 'WHERE id = $1' : ''};
          `;
          const valuesGet = id ? [id] : [];
          const resultGet = await pool.query(queryGet, valuesGet);
          responseMessage = JSON.stringify(resultGet.rows);
        }
        break;
      
      case 'PUT':
        const queryPut = `
          UPDATE statistics
          SET site_name = $1, visit_count = $2, avg_load_time = $3, bounce_rate = $4, latitude = $5, longitude = $6
          WHERE id = $7 RETURNING *;
        `;
        const valuesPut = [siteName, visits, loadTime, bounceRate, latitude, longitude, id];
        const resultPut = await pool.query(queryPut, valuesPut);
        responseMessage = JSON.stringify(resultPut.rows[0]);
        break;
      
      case 'DELETE':
        const queryDelete = `
          DELETE FROM statistics
          WHERE id = $1 RETURNING *;
        `;
        const valuesDelete = [id];
        const resultDelete = await pool.query(queryDelete, valuesDelete);
        responseMessage = JSON.stringify(resultDelete.rows[0]);
        break;

      default:
        throw new Error('Unsupported method');
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }

  return {
    statusCode,
    body: responseMessage,
  };
};
