import React, {useState, useRef, useEffect} from 'react';

export default ({ plant, isSelected, onClick, onMouseEnter }) => {

  const ref = useRef();
  const [didSelectByMouseEnter, setDidSelectByMouseEnter] = useState(false);

  useEffect(() => {
    if (isSelected && !didSelectByMouseEnter) {
      ref.current.scrollIntoView(false);
    }
    if (!isSelected) {
      setDidSelectByMouseEnter(false);
    }
  }, [isSelected]);

  return (
    <li
      ref={ref}
      onMouseDown={onClick}
      className={
        'PlantSelectionInputSuggestion' + (isSelected ? ' isSelected' : '')
      }
      onMouseEnter={e => {
        setDidSelectByMouseEnter(true);
        onMouseEnter(e);
      }}
    >
      <span className="PlantSelectionInputSuggestion_genus_species">
        {plant.genus}
        {' '}
        {plant.species}
      </span>
      <span className="PlantSelectionInputSuggestion_family">
        {plant.family}
      </span>
    </li>
  );
};
