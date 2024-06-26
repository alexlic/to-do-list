import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemOptionComponent } from '../list-item-option/list-item-option.component';
import { todoListItem } from '../../services/list.service';

@Component({
  imports: [ListItemOptionComponent],
  selector: 'app-list-item',
  styleUrls: ['./list-item.component.css'],
  standalone: true,
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  @Input() todoListItem: todoListItem | undefined;
  @Output() onRemoveTodo: EventEmitter<void> = new EventEmitter();

  onRemove() {
    this.onRemoveTodo.emit();
  }
}
