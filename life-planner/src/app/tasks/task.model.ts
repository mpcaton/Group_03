export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface TaskModel {
  tid?: string;
  rid?: string; // Role.id;
  name: string;
  pid?: string;
  hours: number;
  urgent: boolean;
  important: boolean;
  dueDateTime?: Date;
  isComplete: boolean;
  weight?: TaskWeight;
  schedule?: TimeSlot[];
//  tagIDs?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum TaskWeight {
  NONE = <any>'NONE',
  EASY = <any>'EASY',
  MEDIUM = <any>'MEDIUM',
  HARD = <any>'HARD',
  SUPERHARD = <any>'SUPERHARD'
}

export namespace TaskWeight {
  /*
    export function keys() {
      return Object.keys(TaskWeight).filter(
        (type) => isNaN(<any>type) && type !== 'keys'
      );
    }
  */
  export function values() {
    return Object.keys(TaskWeight).filter(
      (type) => isNaN(<any>type) && type !== 'values' && type !== 'defaultVal'
    );
  }
}
