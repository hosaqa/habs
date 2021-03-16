import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from 'configs';
import { APIService } from 'interfaces';

class FirebaseService implements APIService {
  private _fb: firebase.app.App;
  private _db: firebase.database.Database;
  private _dbRefs: Record<string, string>;

  constructor() {
    this._fb = firebase.initializeApp(firebaseConfig);

    this._db = this._fb.database();
    this._dbRefs = {
      habits: 'habits/',
    };
  }

  subscribe = (ref: string, callback: (data: any) => void) => {
    if (!this._dbRefs[ref]) throw `FirebaseService: can\'t subscribe on ref ${ref}. It not exists!`;

    const habits = this._db.ref(ref);

    habits.on('value', (snapshot) => {
      const data = snapshot.val();

      callback(data);
    });
  };

  addHabit = (name: string): Promise<any> => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0);

    return this._db.ref(this._dbRefs.habits).update({
      [name]: {
        name,
        startDate,
      },
    });
  };

  removeHabit = (name: string): Promise<any> => {
    return this._db.ref(this._dbRefs.habits).child(name).remove();
  };

  addDate = (name: string, date: Date): Promise<any> => {
    date.setHours(0, 0, 0);

    const timestamp = date.getTime();
    const dateRef = firebase.database().ref(`${this._dbRefs.habits}/${name}/dates/${timestamp}`);

    return dateRef.set({
      date: timestamp,
      achievement: 'lol',
    });
  };

  removeDate = (name: string, date: Date): Promise<any> => {
    date.setHours(0, 0, 0);

    const timestamp = date.getTime();
    const dateRef = firebase.database().ref(`${this._dbRefs.habits}/${name}/dates/${timestamp}`);

    return dateRef.remove();
  };
}

export default new FirebaseService();
