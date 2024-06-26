import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface todoListItem {
  id: string;
  title: string;
  completed: boolean;
  subTodos?: todoListItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor() {}

  private todos: todoListItem[] = [
    {
      id: '1',
      title: 'Review Figma Design',
      completed: true,
    },
    {
      id: '2',
      title:
        'Create a component and get the to-do list data from the list.service.ts',
      completed: false,
      subTodos: [
        {
          id: '2a',
          title:
            'Make sure the items are ordered by the dateCreated value (newest items should appear at the bottom of the list)',
          completed: false,
        },
      ],
    },
    {
      id: '3',
      title: 'Render the list in your component',
      completed: false,
      subTodos: [
        {
          id: '3a',
          title:
            'Child-level to-dos should be nested under their parent to-do item.',
          completed: false,
        },
      ],
    },
    {
      id: '4',
      title:
        'Add the ability for the user to add new to-do items or sub to-do items',
      completed: false,
    },
    {
      id: '5',
      title:
        'Enable toggling each to-do item as completed. You do not need to persist the component state.',
      completed: false,
      subTodos: [
        {
          id: '5a',
          title:
            'A completed to-do item should look like the first item in the Figma',
          completed: true,
        },
        {
          id: '5b',
          title:
            'Toggling a to-do item complete at the top level should automatically mark the child-level to-dos complete',
          completed: false,
        },
      ],
    },
    {
      id: '6',
      title: 'Submit this StackBlitz',
      completed: false,
      subTodos: [
        {
          id: '6a',
          title: 'Click “Share” at the top of the page ',
          completed: false,
        },
        {
          id: '6b',
          title:
            'Copy the “Editor URL” and make sure the visibility is set to Public',
          completed: false,
        },
        {
          id: '6c',
          title: 'Send the link to eric.rowe@stukent.com',
          completed: false,
        },
      ],
    },
    {
      id: '7',
      title: '(Optional) Bonus Tasks',
      completed: false,
      subTodos: [
        {
          id: '7a',
          title: 'Demonstrate proper parent/child component architecture',
          completed: false,
        },
        {
          id: '7b',
          title: 'Ensure responsiveness across a wide range of screen sizes',
          completed: false,
        },
        {
          id: '7c',
          title: 'Add ability to delete items',
          completed: false,
        },
        {
          id: '7d',
          title:
            'Add ability to collapse a to-do item to show only the parent item',
          completed: false,
        },
        {
          id: '7e',
          title:
            'Add an animation when marking an item as completed (get creative)',
          completed: false,
        },
        {
          id: '7f',
          title:
            'Add a dropdown at the top to select a different sort order for the list. The options should include Date Created, Completed, or Alphabetical.',
          completed: false,
        },
        {
          id: '7g',
          title: 'Add an option to toggle dark mode',
          completed: false,
        },
      ],
    },
  ];

  get(): Observable<todoListItem[]> {
    return of(this.todos);
  }

  getLastIndex() {
    return this.todos[this.todos.length - 1].id;
  }

  setTodo(todo: todoListItem) {
    this.todos.push(todo);
  }

  removeTodo(id: string) {
    this.todos.map((todo) => {
      if (todo.id == id) {
        todo.id = '';
      }
    });
    this.todos = this.todos.filter((todo) => todo.id);
  }

  toggleTodo(id: string) {
    const isMainTodo = Number(id);
    const mainTodoId = isMainTodo ? id : id.replace(/\D/g, '');

    this.todos.map((todo) => {
      if (todo.id === mainTodoId) {
        // if is a main todo we also toggle all the sub todos
        if (isMainTodo) {
          todo.completed = !todo.completed;
          if (!!todo?.subTodos?.length) {
            todo.subTodos.map((subTodo) => {
              subTodo.completed = todo.completed;
            });
          }
        } else {
          if (!!todo?.subTodos?.length) {
            const areTodosCompleted = todo.subTodos.every(
              (subTodo) => subTodo.completed
            );
            todo.subTodos.map((subTodo) => {
              if (subTodo.id === id) subTodo.completed = !subTodo.completed;
              if (areTodosCompleted) todo.completed = false;
            });
            if (todo.subTodos.every((subTodo) => subTodo.completed)) {
              todo.completed = true;
            }
          }
        }
      }
    });
  }
}
