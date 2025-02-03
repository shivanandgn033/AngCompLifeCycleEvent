import { Component } from '@angular/core';
import { LifecycleDemoComponent } from '../lifecycle-demo/lifecycle-demo.component';

@Component({
  selector: 'app-parent',
  imports: [LifecycleDemoComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  parentName = "Initial Name";
  changeName() {
    this.parentName = "New Name " + Date.now();
  }
}
