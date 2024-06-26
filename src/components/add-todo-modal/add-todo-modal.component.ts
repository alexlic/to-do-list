import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-add-todo-modal',
  standalone: true,
  styleUrls: ['./add-todo-modal.component.css'],
  templateUrl: './add-todo-modal.component.html',
})
export class AddTodoModalComponent {
  @Input() isOpen: boolean | undefined;
  @Output() toggleModal: EventEmitter<void> = new EventEmitter();

  amountOfSubTodos: number;
  todoTitle: string;
  subTodos: string[];

  constructor(private listService: ListService) {
    this.amountOfSubTodos = 0;
    this.subTodos = [];
    this.todoTitle = '';
  }

  onSubTodoInputChange(value: string, index: number) {
    this.subTodos[index] = value;
  }

  onTodoInputChange(value: string) {
    this.todoTitle = value;
  }

  onToggleModal() {
    this.amountOfSubTodos = 0;
    this.todoTitle = '';
    this.subTodos = [];
    this.toggleModal.emit();
  }

  onAddSubTodoClick() {
    this.amountOfSubTodos = this.amountOfSubTodos + 1;
    this.subTodos.push('');
  }

  onSubmit() {
    const todoId = String(Number(this.listService.getLastIndex()) + 1);
    console.log('id ', todoId);
    const todo = {
      id: todoId,
      title: this.todoTitle,
      completed: false,
    };
    if (this.todoTitle) {
      if (!!this.subTodos.length) {
        const subTodos = this.subTodos
          .filter((title) => title !== '')
          .map((title, i) => ({
            id: `${todoId}${String.fromCharCode(65 + i).toLowerCase()}`,
            title,
            completed: false,
          }));

        this.listService.setTodo({
          ...todo,
          subTodos,
        });
      } else {
        this.listService.setTodo(todo);
      }
    }
    this.onToggleModal();
  }
}
