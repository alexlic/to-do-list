import { Component, OnInit } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { AddTodoModalComponent } from '../add-todo-modal/add-todo-modal.component';
import { ListService, todoListItem } from '../../services/list.service';

@Component({
  imports: [AddTodoModalComponent, ListItemComponent],
  selector: 'app-list-container',
  standalone: true,
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
  todosList: todoListItem[];
  isModalOpen: boolean;

  constructor(private listService: ListService) {
    this.todosList = [];
    this.isModalOpen = false;
  }

  ngOnInit() {
    this.listService.get().subscribe((todosList) => {
      this.todosList = todosList;
    });
  }

  onRemoveTodo(id: string) {
    this.listService.removeTodo(id);
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
