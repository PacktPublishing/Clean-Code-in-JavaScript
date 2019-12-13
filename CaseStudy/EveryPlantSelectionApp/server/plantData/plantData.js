import TrieSearch from 'trie-search';
import plantData from './data.json';

const MIN_QUERY_LENGTH = 3;

const trie = new TrieSearch(['fullyQualifiedName'], {
  ignoreCase: true,
  // splitOnRegEx: true,
  // min: 3
});

trie.addAll(
  plantData.map(plant => {
    return {
      ...plant,
      fullyQualifiedName:
        `${plant.family} ${plant.genus} ${plant.species}`
    };
  })
);

export default {
  query(partialString) {
    if (partialString.length < MIN_QUERY_LENGTH) {
      return [];
    }
    return trie.get(partialString).slice(0, 30);
  }
};
