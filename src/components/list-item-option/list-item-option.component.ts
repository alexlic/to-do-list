import { Component, Input } from '@angular/core';
import { ListService, todoListItem } from '../../services/list.service';

@Component({
  selector: 'app-list-item-option',
  templateUrl: './list-item-option.component.html',
  standalone: true,
  styleUrls: ['./list-item-option.component.css'],
})
export class ListItemOptionComponent {
  @Input() item: todoListItem | undefined;

  constructor(private listService: ListService) {}

  onToggleCheckbox = (id: string) => {
    this.listService.toggleTodo(this.item?.id || '');
  };
}
