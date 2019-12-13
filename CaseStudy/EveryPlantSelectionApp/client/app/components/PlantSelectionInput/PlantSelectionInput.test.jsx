import React from 'react';
import renderer from 'react-test-renderer';
import PlantSelectionInput from './';

describe('PlantSelectionInput', () => {

  it('Should render deterministically to its snapshot', () => {
    expect(
      renderer
        .create(
          <PlantSelectionInput
            onSelect={() => {}}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  describe('With configured isInitiallyOpen & value properties', () => {
    it('Should render deterministically to its snapshot', () => {
      expect(
        renderer
          .create(
            <PlantSelectionInput
              isInitiallyOpen={true}
              value="Example..."
              onSelect={() => {}}
            />
          )
          .toJSON()
      ).toMatchSnapshot();
    });
  });

});
