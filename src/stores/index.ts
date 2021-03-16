import HabitsStore, { IHabitsStore } from './HabitsStore';

export interface IStore {
  habitsStore: IHabitsStore;
}

const store: IStore = {
  habitsStore: HabitsStore,
};

export default store;
