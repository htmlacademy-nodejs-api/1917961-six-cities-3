import { City } from './city.type.js';
import { Host } from './host.type.js';
import { Location } from './location.type.js';

export type MockData = {
  cities: City[];
  hosts: Host[];
  description: string[];
  goods: string[];
  images: string[];
  title: string[];
  type: string[];
  locations: Location[];
}
