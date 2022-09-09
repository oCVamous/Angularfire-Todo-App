import { Component } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos$: Observable<any>;
  todos: Array<any>;
  todoText: string = '';

  constructor(private firestore: Firestore) {
    const coll = collection(firestore, 'todos');
    this.todos$ = collectionData(coll);

    this.todos$.subscribe( newTodos => {
      console.log('neue Todos sind:', newTodos);
      this.todos = newTodos;
      alert('New Todo UPDATE');
    });   
  }

  addTodo() {
    const coll = collection(this.firestore, 'todos');
    setDoc(doc(coll), {name: this.todoText});
  }
}


