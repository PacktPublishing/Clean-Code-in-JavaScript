import React, {useState, useRef, useEffect} from 'react';
import PlantSelectionInputSuggestion from './PlantSelectionInputSuggestion.jsx';
import usePlantsLike from './usePlantsLike';

const MIN_QUERY_LENGTH = 3;

const KEYCODES = {
  ENTER: 13,
  ARROW_DOWN: 40,
  ARROW_UP: 38
};

export default ({ isInitiallityOpen, value, onSelect }) => {

  const inputRef = useRef();

  const [isOpen, setIsOpen] = useState(isInitiallityOpen || false);
  const [query, setQuery] = useState(value);

  const [selectedIndex, setSelectedIndex] = useState(1);
  const {loading, plants} = usePlantsLike(query);

  function onKeyUp(e) {
    switch (e.keyCode) {
      case KEYCODES.ENTER:
        if (selectedIndex > -1) {
          onSelect(plants[selectedIndex]);
        }
        break;
      case KEYCODES.ARROW_UP:
        setSelectedIndex(selectedIndex === 0 ? 0 : selectedIndex - 1);
        break;
      case KEYCODES.ARROW_DOWN:
        setSelectedIndex(
          selectedIndex === plants.length - 1 ? selectedIndex : selectedIndex + 1
        );
        break;
    }
  }

  useEffect(() => {
    setSelectedIndex(-1);
  }, [loading, plants]);

  return <div className="PlantSelectionInput">
    <input
      onFocus={() => {
        setQuery(inputRef.current.value);
        setIsOpen(true);
      }}
      onBlur={() => setIsOpen(false)}
      onChange={() => setQuery(inputRef.current.value)}
      ref={inputRef}
      autoComplete="off"
      aria-autocomplete="true"
      spellCheck="false"
      aria-expanded={String(isOpen)}
      role="combobox"
      onKeyUp={onKeyUp}
      defaultValue={value} />
    {
      isOpen &&
        <ol>
          {
            !plants.length && (!query || query.length < MIN_QUERY_LENGTH) &&
              <li className="PlantSelectionInput_notice">
                Please begin typing a plant name...
              </li>
          }
          {
            !plants.length && query && query.length >= MIN_QUERY_LENGTH && loading &&
              <li className="PlantSelectionInput_notice">
                Loading...
              </li>
          }
          {
            !plants.length && query && query.length >= MIN_QUERY_LENGTH && !loading &&
              <li className="PlantSelectionInput_notice">
                No plants with that name found...
              </li>
          }
          {
            plants.map(
              (plant, index) =>
              <PlantSelectionInputSuggestion
                key={plant.id}
                plant={plant}
                isSelected={selectedIndex === index}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  onSelect(plant);
                }}
              />
            )
          }
        </ol>
    }
  </div>;
};
