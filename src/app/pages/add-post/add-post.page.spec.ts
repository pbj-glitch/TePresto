import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostPage } from './add-post.page';

describe('AddPostPage', () => {
  let component: AddPostPage;
  let fixture: ComponentFixture<AddPostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not mark the form as submitted while invalid', () => {
    component.onSubmit();
    expect(component.submitted()).toBe(false);
  });

  it('marks the form as submitted once every field is filled', () => {
    component.form.setValue({
      title: 'Bicicleta de montaña',
      category: 'Deportes',
      guaranteePrice: '8000',
      description: 'Poco uso, ideal para paseos.',
    });

    component.onSubmit();

    expect(component.submitted()).toBe(true);
  });
});
