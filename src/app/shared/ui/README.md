# Shared UI Components

This directory contains reusable presentational components that can be used across the entire application.

## Guidelines

### What Goes Here?

- **Pure UI components** with no business logic
- **Reusable across multiple domains**
- **Generic components** like buttons, cards, modals, form fields
- Components that receive data via `input()` and emit events via `output()`

### What Doesn't Go Here?

- Components with business logic (use domain/features instead)
- Domain-specific components (use domain/features/ui instead)
- Components that depend on stores or services

## Example Components

Create components like:

- `button/` - Reusable button component
- `card/` - Generic card container
- `modal/` - Modal dialog
- `form-field/` - Form input wrapper
- `table/` - Generic data table
- `pagination/` - Pagination controls
- `tabs/` - Tab component
- `dropdown/` - Dropdown menu

## Component Structure

Each component should follow this structure:

```
component-name/
├── component-name.component.ts
├── component-name.component.html
├── component-name.component.scss
├── component-name.component.spec.ts
└── index.ts (optional - for barrel exports)
```

## Example Component

```typescript
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mhr-button',
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="'btn btn-' + variant()"
      (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styles: [`
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-primary { background: #1976d2; color: white; }
    .btn-secondary { background: #757575; color: white; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);
  clicked = output<void>();
}
```

## Best Practices

1. **Use OnPush change detection** for all components
2. **Use signals** for inputs and outputs (`input()`, `output()`)
3. **Keep components small and focused** on a single responsibility
4. **Use semantic HTML** for accessibility
5. **Follow WCAG AA guidelines** for accessibility
6. **Write unit tests** for all components
7. **Document component APIs** with JSDoc comments
8. **Use TypeScript strict mode**
9. **Avoid business logic** - keep components pure and presentational
10. **Export components** via barrel files for cleaner imports

## Accessibility

All shared UI components must:

- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Have sufficient color contrast
- Include focus indicators
- Work with screen readers

## Testing

Test each component in isolation:

```typescript
describe('ButtonComponent', () => {
  it('should emit clicked event when clicked', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    let clicked = false;
    fixture.componentInstance.clicked.subscribe(() => clicked = true);

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clicked).toBe(true);
  });
});
```
