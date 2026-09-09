import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChipComponent } from './category-chip.component';

describe('CategoryChipComponent', () => {
  let component: CategoryChipComponent;
  let fixture: ComponentFixture<CategoryChipComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryChipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Herramientas');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits chipClick when clicked', () => {
    let clicked = false;
    component.chipClick.subscribe(() => (clicked = true));

    fixture.nativeElement.querySelector('ion-chip').click();

    expect(clicked).toBe(true);
  });
});
