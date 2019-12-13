import {useState, useEffect} from 'react';
import debounce from 'debounce-promise';
import fetch  from 'node-fetch';

const makeRequest = debounce(query => {
  return (
      fetch(`http://localhost:3000/plants/${query}`)
        .then(response => response.json())
  );
}, 300, { leading: true });

export default (query, generateDataURL) => {

  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState([]);

  useEffect(() => {

    if (!query) {
      setPlants([]);
      return;
    }

    setLoading(true);

    makeRequest(query).then(data => {
      setLoading(false);
      setPlants(data);
    });

  }, [query]);

  return {
    loading,
    plants
  }

};
