export interface IHabitDate {
  date: number;
  achievement: string;
}

export interface IHabit {
  name: string;
  dates: Record<number, IHabitDate>;
}

export interface APIService {
  subscribe: (ref: string, callback: (data: any) => void) => void;
  addHabit: (name: string) => Promise<any>;
  removeHabit: (name: string) => Promise<any>;
  addDate: (name: string, date: Date) => Promise<any>;
  removeDate: (name: string, date: Date) => Promise<any>;
}
