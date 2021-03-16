import { makeObservable, makeAutoObservable, action, computed, observable } from 'mobx';
import { IHabit } from 'interfaces';
import FirebaseService from 'services/Firebase';
import { APIService } from 'interfaces';

export interface IHabitsStore {
  list: IHabit[] | null;
  // currentCombos: IHabit[] | null,
  addHabit: (name: string) => Promise<any>;
  removeHabit: (name: string) => Promise<any>;
  addDate: (name: string, date: Date) => Promise<any>;
  removeDate: (name: string, date: Date) => Promise<any>;
  listAsMap: any;
}

class HabitsStore implements IHabitsStore {
  private _apiService: APIService;
  public list: IHabit[] | null;

  constructor() {
    makeObservable(this, {
      list: observable,
      listAsMap: computed,
      addDate: action,
      removeDate: action,
      addHabit: action,
    });

    this._apiService = FirebaseService;

    this.list = [];

    this._apiService.subscribe('habits', (data) => {
      const habitsData = data && (Object.entries(data).map(([_, habit]) => habit) as IHabit[]);

      this.list = habitsData;
    });
  }

  get listAsMap() {
    return (
      this.list &&
      this.list.reduce((acc, habit) => {
        return {
          ...acc,
          [habit.name]: habit,
        };
      }, {})
    );
  }

  // get currentCombos () {
  //   return this._list;
  // }

  addHabit = (name: string): Promise<any> => {
    return this._apiService.addHabit(name);
  };

  removeHabit = (name: string): Promise<any> => {
    return this._apiService.removeHabit(name);
  };

  addDate = (name: string, date: Date): Promise<any> => {
    return this._apiService.addDate(name, date);
  };

  removeDate = (name: string, date: Date): Promise<any> => {
    return this._apiService.removeDate(name, date);
  };
}

export default new HabitsStore();
