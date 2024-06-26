import { Component } from '@angular/core';
import { ListContainerComponent } from '../list-container/list-container.component';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  imports: [ListContainerComponent],
  selector: 'app-root',
  standalone: true,
  template: `
     <div class="root-container">
       <app-list-container/>
     </div>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
