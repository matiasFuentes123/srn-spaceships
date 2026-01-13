import { Spaceship } from '../types/spaceship';

/**
 * Filtra un array de naves espaciales por facción
 * @param spaceships - Array de naves espaciales a filtrar
 * @param faction - Facción por la cual filtrar. Si es 'Todas', devuelve todas las naves
 * @returns Array filtrado de naves espaciales
 */
export function filterSpaceshipsByFaction(
  spaceships: Spaceship[],
  faction: string
): Spaceship[] {
  if (faction === 'Todas') {
    return spaceships;
  }
  
  return spaceships.filter((ship) => ship.faction === faction);
}
