import {Resource} from './resource';
import {Vote} from './vote';

export class Survey {
  id: number;
  topic: string;
  resources: Array<Resource>;
  votes: Array<Vote>;
}
