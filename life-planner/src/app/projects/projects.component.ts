import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {AuthService} from '../core/auth.service';
import {Observable} from 'rxjs/Observable';

interface Project {
  pid: string;
  name: string;
  description: string;
}

interface TaskID {
  tid: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  private projectCollection: AngularFirestoreCollection<Project>;
  projects: Observable<Project[]>;
  projName: string;
  projDescription: string;

  constructor(public db: AngularFirestore) {
    if (AuthService.isLoggedIn()) {
      console.log(AuthService.currentUserId());
      this.projectCollection = this.readProjectCollection(AuthService.currentUserId());
      this.projects = this.projectCollection.valueChanges();
    } else {
      // redirect to login screen please //
      console.log('Why are you here?');
    }

  }

  ngOnInit() {
  }

  createProjectDocument(name: string, description: string) {
    // subject to change //
    this.projectCollection.add({
      pid: '',
      name: name,
      description: description,
    })
      .then( ref => this.projectCollection.doc(ref.id).update({'pid': ref.id} ) )
      .catch(error => console.log(error));
  }

  readProjectCollection(uid: string) {
    return this.db.collection('users').doc(uid).collection<Project>('projects');
  }

  readProjectTaskCollection(pid: string) {
    return this.projectCollection.doc(pid).collection<TaskID>('tasks');
  }

  readProjectEventCollection(pid: string) {
    return this.projectCollection.doc(pid).collection('events');

  }

  updateProject(pid: string, name: string, description: string) {
    this.projectCollection.doc(pid).update({'name': name, 'description': description})
      .then( ref => console.log(ref)) // kinda wanna do a toast here
      .catch( error => console.log(error));
  }

  deleteProjectDocument(pid: string) {
    const projectTasks = this.projectCollection.doc(pid).collection('tasks').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as TaskID;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
    const allTasks: Array<{tid: string; id: string}[]> = [];
    projectTasks.subscribe((items) => {
        allTasks.push(items);
        for ( let index = 0; index < allTasks.length; index++) {
          for ( let inner = 0; inner < allTasks[index].length; inner++) {
            this.projectCollection.doc(pid).collection('tasks').doc(allTasks[0][index].tid).delete()
              .then(function () {
                console.log('item deleted');
              })
              .catch(function () {
                console.log('item not deleted');
              });
          }
        }
      }
    );
    this.projectCollection.doc(pid).delete()
      .then(function() { console.log('project deleted'); })
      .catch( function() { console.log('project not deleted'); });
  }

}
