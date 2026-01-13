import { filterSpaceshipsByFaction } from '../filterUtils';
import { Spaceship } from '../../types/spaceship';

describe('filterSpaceshipsByFaction', () => {
  // Datos mock proporcionados por el usuario
  const mockSpaceships: Spaceship[] = [
    {
      id: 1,
      name: 'Millennium Falcon',
      description: 'Un carguero ligero YT-1300 corelliano muy modificado. Famosa por recorrer el Corredor de Kessel en menos de 12 pársecs.',
      faction: 'Rebels',
    },
    {
      id: 2,
      name: 'X-Wing (T-65B)',
      description: 'El caza estelar versátil de la Alianza Rebelde que equilibra velocidad y potencia de fuego. Famoso por destruir la Estrella de la Muerte.',
      faction: 'Rebels',
    },
    {
      id: 3,
      name: 'TIE Fighter',
      description: 'Símbolo inolvidable de la flota imperial. Caza estelar de corto alcance, rápido y ágil, pero sin escudos deflectores.',
      faction: 'Empire',
    },
    {
      id: 4,
      name: 'Slave I',
      description: 'Una nave de ataque y patrulla clase Firespray-31 modificada, utilizada por los cazarrecompensas Jango Fett y Boba Fett.',
      faction: 'Bounty Hunters',
    },
    {
      id: 5,
      name: 'Star Destroyer',
      description: 'Nave capital masiva en forma de cuña, columna vertebral de la Armada Imperial. Posee una potencia de fuego abrumadora.',
      faction: 'Empire',
    },
    {
      id: 6,
      name: 'Razor Crest',
      description: 'Una cañonera ST-70 de asalto ex-militar utilizada por el Mandaloriano Din Djarin para sus misiones.',
      faction: 'Independent',
    },
    {
      id: 7,
      name: 'Y-Wing',
      description: 'Bombardero de asalto estelar. Aunque lento y menos maniobrable, es conocido por su durabilidad y gran carga de bombas.',
      faction: 'Rebels',
    },
    {
      id: 8,
      name: 'TIE Advanced x1',
      description: 'Prototipo de caza estelar utilizado por Darth Vader, con escudos y un hipermotor, superando a los TIE estándar.',
      faction: 'Empire',
    },
    {
      id: 9,
      name: 'Naboo N-1 Starfighter',
      description: 'Caza elegante y artesanal utilizado por el cuerpo de defensa de Naboo, destaca por su acabado en cromo y amarillo.',
      faction: 'Republic',
    },
    {
      id: 10,
      name: 'Executor',
      description: 'El buque insignia personal de Darth Vader. Una de las naves más grandes y poderosas jamás construidas.',
      faction: 'Empire',
    },
  ];

  describe('cuando la facción es "Todas"', () => {
    it('debe devolver todas las naves sin filtrar', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'Todas');

      expect(result).toEqual(mockSpaceships);
      expect(result).toHaveLength(10);
    });
  });

  describe('cuando se filtra por facción específica', () => {
    it('debe devolver solo las naves de la facción "Rebels"', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'Rebels');

      expect(result).toHaveLength(3);
      expect(result).toEqual([
        expect.objectContaining({ id: 1, name: 'Millennium Falcon', faction: 'Rebels' }),
        expect.objectContaining({ id: 2, name: 'X-Wing (T-65B)', faction: 'Rebels' }),
        expect.objectContaining({ id: 7, name: 'Y-Wing', faction: 'Rebels' }),
      ]);
    });

    it('debe devolver solo las naves de la facción "Empire"', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'Empire');

      expect(result).toHaveLength(4);
      expect(result.every(ship => ship.faction === 'Empire')).toBe(true);
      expect(result.map(ship => ship.name)).toEqual([
        'TIE Fighter',
        'Star Destroyer',
        'TIE Advanced x1',
        'Executor',
      ]);
    });

    it('debe devolver solo las naves de la facción "Bounty Hunters"', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'Bounty Hunters');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(
        expect.objectContaining({ id: 4, name: 'Slave I', faction: 'Bounty Hunters' })
      );
    });

    it('debe devolver solo las naves de la facción "Independent"', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'Independent');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(
        expect.objectContaining({ id: 6, name: 'Razor Crest', faction: 'Independent' })
      );
    });

    it('debe devolver solo las naves de la facción "Republic"', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'Republic');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(
        expect.objectContaining({ id: 9, name: 'Naboo N-1 Starfighter', faction: 'Republic' })
      );
    });
  });

  describe('casos edge', () => {
    it('debe devolver un array vacío cuando se filtra por una facción inexistente', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'Jedi Order');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('debe devolver un array vacío cuando el array de entrada está vacío', () => {
      const result = filterSpaceshipsByFaction([], 'Rebels');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('debe devolver un array vacío cuando el array de entrada está vacío y la facción es "Todas"', () => {
      const result = filterSpaceshipsByFaction([], 'Todas');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('debe ser case-sensitive al filtrar facciones', () => {
      const result = filterSpaceshipsByFaction(mockSpaceships, 'rebels');

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('inmutabilidad', () => {
    it('no debe modificar el array original', () => {
      const originalLength = mockSpaceships.length;
      const originalFirstItem = mockSpaceships[0];

      filterSpaceshipsByFaction(mockSpaceships, 'Empire');

      expect(mockSpaceships).toHaveLength(originalLength);
      expect(mockSpaceships[0]).toBe(originalFirstItem);
    });
  });
});
