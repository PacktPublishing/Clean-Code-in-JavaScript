import plantData from './plantData';

describe('plantData', () => {

  describe('Query length < 3', () => {
    it('Returns emnpty array', () => {
      expect(plantData.query('')).toEqual([]);
      expect(plantData.query('a')).toEqual([]);
      expect(plantData.query('al')).toEqual([]);
    });
  });

  describe('Valid query length', () => {
    describe('Non-existing prefix', () => {
      it('Returns empty array', () => {
        expect(plantData.query('fooBarDoesNotExist')).toEqual([]);
      });
    });

    describe('Family name search (Acanthaceae)', () => {
      it('Returns plants with family name of "Acanthaceae"', () =>{
        const results = plantData.query('Acanthaceae');
        expect(
          results.filter(plant => plant.family === 'Acanthaceae')
        ).toHaveLength(results.length);
      });
    });

    describe('Family+Genus name search (Acanthaceae Thunbergia)', () => {
      it('Returns plants with family and genus of "Acanthaceae Thunbergia"', () =>{
        const results = plantData.query('Acanthaceae Thunbergia');
        expect(results.length).toBeGreaterThan(0);
        expect(
          results.filter(plant =>
            plant.family === 'Acanthaceae' &&
            plant.genus === 'Thunbergia'
          )
        ).toHaveLength(results.length);
      });
    });

    describe('Partial family+Genus name search (Acantu Thunbe)', () => {
      it('Returns plants with family and genus of "Acanthaceae Thunbergia"', () =>{
        const results = plantData.query('Acant Thun');
        expect(results.length).toBeGreaterThan(0);
        expect(
          results.filter(plant =>
            /\bAcant/i.test(plant.fullyQualifiedName) &&
            /\bThun/i.test(plant.fullyQualifiedName)
          )
        ).toHaveLength(results.length);
      });
    });

    describe('Family+Genus+Species name search (Acanthaceae Thunbergia acutibracteata)', () => {

      const EXPECTED_PLANT_DATA = {
        family: 'Acanthaceae',
        genus: 'Thunbergia',
        species: 'acutibracteata',
        fullyQualifiedName: 'Acanthaceae Thunbergia acutibracteata',
        id: 7779
      };

      it('Returns only the single plant', () => {
        expect(
          plantData.query('Acanthaceae Thunbergia acutibracteata')
        ).toEqual([
          EXPECTED_PLANT_DATA
        ]);
      });
      describe('Case variants', () => {
        it('Returns the same plant regardless of query case', () => {
          expect(
            plantData.query('acanthaceae thunbergia acutibracteata')
          ).toEqual([
            EXPECTED_PLANT_DATA
          ]);
          expect(
            plantData.query('Acanthaceae Thunbergia ACUTIbracteata')
          ).toEqual([
            EXPECTED_PLANT_DATA
          ]);
          expect(
            plantData.query('Acanthaceae THUNBERGIA acutibracteata')
          ).toEqual([
            EXPECTED_PLANT_DATA
          ]);
        });
      });
    });
  });
});
