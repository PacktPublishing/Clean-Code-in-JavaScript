import ReactDOM from 'react-dom';
import React from 'react';
import PlantSelectionInput from './components/PlantSelectionInput';

ReactDOM.render(
  <PlantSelectionInput
    onSelect={
      plant => alert(`You selected ${plant.fullyQualifiedName}`)
    }
  />,
  document.getElementById('root')
);
