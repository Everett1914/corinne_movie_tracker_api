require('dotenv').config()
const Pool = require('pg').Pool;
const pool = new Pool({
  user:process.env.DB_USER,
  host:process.env.DB_HOST,
  database:process.env.DB_DATABASE,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
  ssl: { rejectUnauthorized:false }
});

const getAllMedia = async (request, response) => {
    pool.query('SELECT media_id, name, genre, source, cost, type, rating, created_at AS date FROM media_av', (error, results) => {
      if (error) { 
        throw error
      }
      response.status(200).json(results.rows);
    })
};

const addMedia = async (request, response) => {

  const { name, genre, source, cost, type, rating } = (request.body);

  pool.query('INSERT INTO media_av (name, genre, source, cost, type, rating) VALUES ($1, $2, $3, $4, $5, $6)', [name, genre, source, cost, type, rating], (error, results) => {
    if (error) { 
      throw error
    }
    response.status(201).send('A new media was added.');
  })
};

const deleteMedia = async (request, response) => {

  const media_id = parseInt(request.params.media_id)

  pool.query('DELETE FROM media_av WHERE media_id = $1', [media_id], (error, results) => {
    if (error) { 
      throw error
    }
    response.status(200).send(`Media with id ${media_id} was deleted`);
  })
};

const updateMedia = async (request, response) => {

  const media_id = parseInt(request.params.media_id)
  const { name, genre, source, cost, type, rating } = request.body

  pool.query('UPDATE media_av SET name = $1, genre = $2, source = $3, cost = $4, type = $5, rating = $6 WHERE media_id = $7', 
  [name, genre, source, cost, type, rating, media_id],
   (error, results) => {
    if (error) { 
      throw error
    }
    response.status(200).send(`Media with id ${media_id} was updated`);
  })
};

module.exports = {
    getAllMedia,
    addMedia,
    deleteMedia,
    updateMedia
};

