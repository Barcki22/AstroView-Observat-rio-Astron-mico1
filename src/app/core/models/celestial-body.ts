export interface CelestialBody {
  id?: string;
  name: string;
  type: string;          // ex: 'Planeta', 'Estrela', 'Galáxia'
  distanceLightYears?: number;
  mass?: string;
  description?: string;
  imageUrl?: string;
}
