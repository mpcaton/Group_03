import { User } from '../shared/user.model';

export class TaskModel {
  id?: Number;
  name: string;
  complete: boolean;
  userId: User.id;

  constructor(id: number, name: string, complete: boolean, userId: User.id) {
    this.id = id;
    this.name = name;
    this.complete = complete;
    this.userId  = userId;
  }
}
