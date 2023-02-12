import { City } from './city.type.js';
import { User } from './user.type.js';
import { Location } from './location.type.js';

export type MockData = {
  cities: City[];
  hosts: User[];
  description: string[];
  goods: string[];
  images: string[];
  title: string[];
  type: string[];
  locations: Location[];
}
