### Angular Componet lifecycle hooks

Let's explore Angular 18 component lifecycle hooks with examples.  While the core lifecycle hooks haven't changed drastically in recent Angular versions, it's always good to refresh and see how they're used in modern Angular applications.

TypeScript
```typescript
import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  template: `
    <p>Name: {{ name }}</p>
    <p>Counter: {{ counter }}</p>
    <ng-content></ng-content>
  `,
  styles: []
})
export class LifecycleDemoComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

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
```

// Example of using the component in a parent component
```typescript
@Component({
  selector: 'app-parent',
  template: `
    <app-lifecycle-demo [name]="parentName">
      <p>Projected Content</p>
    </app-lifecycle-demo>

    <button (click)="changeName()">Change Name</button>
  `
})
export class ParentComponent {
  parentName = "Initial Name";

  changeName() {
    this.parentName = "New Name " + Date.now();
  }
}
```

### Explanation and Key Points:

#### Constructor:
Called before any lifecycle hooks.  Use it for basic setup, dependency injection, but not for complex initialization.

#### ngOnChanges(): 
Called when an @Input() property changes.  Provides the SimpleChanges object to see the previous and current values.  Crucial for reacting to input changes.

#### ngOnInit(): 
Called after the first ngOnChanges().  The ideal place for most initialization logic, fetching data, setting up subscriptions, etc.

#### ngDoCheck(): 
Called on every change detection cycle.  Very powerful, but use with extreme caution as it can significantly impact performance if not used carefully.  Usually, you'll want to avoid this unless you have a very specific reason to check for changes that Angular's built-in change detection doesn't catch.

#### ngAfterContentInit(): 
Called after content projected into the component using <ng-content> has been initialized.

#### ngAfterContentChecked(): 
Called after ngAfterContentInit() and on every subsequent change detection cycle.

#### ngAfterViewInit(): 
Called after the component's view and all its child views have been initialized.  Use this for DOM manipulation, interacting with child components, etc.

#### ngAfterViewChecked(): 
Called after ngAfterViewInit() and on every subsequent change detection cycle.

#### ngOnDestroy(): 
Called just before the component is destroyed.  Absolutely essential for cleanup: unsubscribing from observables, releasing resources, preventing memory leaks.

#### Example Usage in a Parent Component:

The example shows how to use the LifecycleDemoComponent in a parent component, passing in a name input.  The button click demonstrates how changing the input triggers the ngOnChanges() hook.  The projected content shows how ngAfterContentInit and ngAfterContentChecked are used.

### Important Considerations:

#### Change Detection: 
Understanding Angular's change detection is key to working effectively with lifecycle hooks.  ngDoCheck() is often a sign that you might be fighting against change detection, so consider if there's a better way to achieve what you need.

#### Performance: 
Be mindful of performance, especially with ngDoCheck(), ngAfterContentChecked(), and ngAfterViewChecked().  Avoid complex operations in these hooks if possible.

#### Cleanup: 
Always unsubscribe in ngOnDestroy() to prevent memory leaks.

This detailed example and explanation should give you a solid understanding of Angular 18 component lifecycle hooks. Remember to use them appropriately to manage your component's behavior and resources efficiently.
