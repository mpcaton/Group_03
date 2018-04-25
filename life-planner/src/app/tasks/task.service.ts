import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';
import {TaskModel} from './task.model';
import {ProjectService} from '../projects/project.service';


@Injectable()
export class TaskService {

  tasksRef: AngularFirestoreCollection<TaskModel>;
  taskDoc: AngularFirestoreDocument<TaskModel>;
  tasks: Observable<TaskModel[]>;
  singleTask: Observable<TaskModel>;


  constructor(private db: AngularFirestore, private ps: ProjectService) {
    if (AuthService.isLoggedIn()) {
      console.log('User ID: ' + AuthService.currentUserId());
      this.tasksRef = this.db.collection('users').doc(AuthService.currentUserId()).collection('tasks');
      this.tasks = this.tasksRef.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here? Who are you?');
    }
  }

  addTask(task: TaskModel, pid?: string) {
    // this.db.collection('finishedExercises').add(task);
    task.createdAt = new Date();
    if (pid !== undefined) {
      task.pid = pid;
    }
    this.tasksRef.add(task)
      .catch(function () {
        console.log('Error adding');
      });
  }

  getTask(tid: string): Observable<TaskModel> {
    this.taskDoc = this.tasksRef.doc(tid);

    console.log('TS: ref lookup ' + this.taskDoc.ref.id);
    this.singleTask = this.taskDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        console.log('TS: task NOT found for tid: ' + tid);
        return null;
      } else {
        const data = action.payload.data() as TaskModel;
        data.tid = action.payload.id;
        console.log('TS: task FOUND for tid: ' + tid);
        return data;
      }
    });

    return this.singleTask;
  }

  findTasks(list: string[] = []): Observable<TaskModel[]> {
    console.log('TS: findTasks tids count: ' + list.length);
    return this.getTasks()
      .map(epics => epics.filter(task => list.includes(task.tid)));
  }

  getTasks(): Observable<TaskModel[]> {
    this.tasks = this.tasksRef.snapshotChanges().map(changes => {
      return changes.map(action => {
        if (action.payload.exists === false) {
          console.log('TS: no tasks found ');
          return null;
        } else {
          const data = action.payload.doc.data() as TaskModel;
          data.tid = action.payload.doc.id;
          return data;
        }
      });
    });

    return this.tasks;
  }

  updateTask(task: TaskModel) {
    task.updatedAt = new Date();
    this.taskDoc = this.tasksRef.doc(task.tid);
    console.log('TS update: incoming task name: ' + task.name);
    this.taskDoc.update(task);
  }

  completeTask(task: TaskModel) {
    task.updatedAt = new Date();
    this.taskDoc = this.tasksRef.doc(task.tid);
    task.isComplete = true;
    console.log('TS: completing task for: ' + task.name);
    this.taskDoc.update(task);
  }

  openCompletedTask(task: TaskModel) {
    task.updatedAt = new Date();
    this.taskDoc = this.tasksRef.doc(task.tid);
    task.isComplete = false;
    console.log('TS: un-completing task for: ' + task.name);
    this.taskDoc.update(task);
  }

  removeRoleFromTask(tid: string, rid: string) {
    console.log('TS: removeTaskFromProject tid: ' + tid);
    console.log('TS: removeTaskFromProject rid: ' + rid);
    this.getTask(tid).take(1).forEach(task => {
      if (task.rid === undefined) {
        task.rid = ''; // [];
      }
      console.log('TS: removeTaskFromProject rid on task: ' + task.rid);
      if (task.rid === rid) {
        task.rid = '';
        this.updateTask(task);
      }
      /*if (!task.rid.includes(tid)) {
        task.rid.push(tid);
        this.updateTask(task);
      }
      */
    });
  }

  addRoleToTask(tid: string, rid: string) {
    console.log('TS: addRoleToTask tid: ' + tid);
    console.log('TS: addRoleToTask rid: ' + rid);
    this.getTask(tid).take(1).forEach(task => {
      if (task.rid === undefined) {
        task.rid = ''; // [];
      }
      console.log('TS: addRoleToTask rid on task: ' + task.rid);
      if (task.rid !== rid) {
        console.log('TS: addRoleToTask applying rid: ' + task.rid + ' to task:' + task.tid);
        task.rid = rid;
        this.updateTask(task);
      }
      /*if (!task.rid.includes(tid)) {
        task.rid.push(tid);
        this.updateTask(task);
      }
      */
    });

  }

  removeTaskFromProject(task: TaskModel) {
    console.log('TS: removeTaskFromProject pid: ' + task.pid);
    console.log('TS: removeTaskFromProject tid: ' + task.tid);
    this.taskDoc = this.tasksRef.doc(task.tid);
    if (task.pid !== undefined) {
      this.ps.removeTaskFromProject(task.pid, task.tid);
    }
    task.pid = '';
    this.updateTask(task);
  }

  addTaskToProject(pid: string, task: TaskModel) {
    console.log('TS addTaskToProject: beginning string pid: ' + pid);
    task.pid = pid;
    this.taskDoc = this.tasksRef.doc(task.tid);
    console.log('TS addTaskToProject: adding PID to task: ' + task.name);
    this.taskDoc.update(task);
    if (task.pid !== undefined) {
      console.log('TS calling PS addTaskToProject for pid: ' + task.pid);
      this.ps.addTaskToProject(task.pid, task.tid);
    }
  }

  deleteTask(task: TaskModel) {
    this.taskDoc = this.tasksRef.doc(task.tid);
    if (task.pid !== undefined) {
      this.ps.removeTaskFromProject(task.pid, task.tid);
    }
    this.taskDoc.delete();
  }


}

