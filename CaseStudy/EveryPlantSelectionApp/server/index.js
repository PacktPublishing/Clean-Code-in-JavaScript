import TrieSearch from 'trie-search';
import express from 'express';
import plantData from './plantData';

const app = express();
const port = process.env.PORT || 3000;

app.get('/plants/:query', (req, res) => {
  const query = req.params.query;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json( plantData.query(query) );
});

app.listen(port, () =>
  console.log(`App listening on port ${port}!`))
