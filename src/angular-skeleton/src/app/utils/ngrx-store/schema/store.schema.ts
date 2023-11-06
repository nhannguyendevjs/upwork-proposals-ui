import { User } from 'src/app/utils/schemas';

export interface IAppStore {
  user: User | null;
}
