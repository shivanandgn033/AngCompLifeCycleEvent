
import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Input } from '@angular/core';
@Component({
  selector: 'app-lifecycle-demo',
  imports: [],
  templateUrl: './lifecycle-demo.component.html',
  styleUrl: './lifecycle-demo.component.css'
})
export class LifecycleDemoComponent  implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() name: string = ''; // Example Input
  counter: number = 0;

  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges() {
    console.log('ngOnChanges called. Name:', this.name);
    // Called when an Input property changes.  Good for reacting to input changes.
  }

  ngOnInit() {
    console.log('ngOnInit called');
    // Called after the first ngOnChanges(). Best place for initialization logic.
  }

  ngDoCheck() {
    console.log('ngDoCheck called. Counter:', this.counter);
    this.counter++;  // Example of actively changing data. Use with caution - can lead to performance issues.
    // Called on every change detection cycle.  Use sparingly as it can be expensive.
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
    // Called after content projected into the component has been initialized.
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
    // Called after the ngAfterContentInit() and every subsequent change detection cycle.
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
    // Called after the component's view and child views are initialized.  Good for interacting with the DOM.
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
    // Called after the ngAfterViewInit() and every subsequent change detection cycle.
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
    // Called just before the component is destroyed.  Important for cleanup (unsubscribing, releasing resources).
  }
}
