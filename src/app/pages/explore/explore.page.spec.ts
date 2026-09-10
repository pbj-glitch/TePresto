import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ExplorePage } from './explore.page';
import { ItemService } from '../../services/item.service';

describe('ExplorePage', () => {
  let component: ExplorePage;
  let fixture: ComponentFixture<ExplorePage>;
  let itemService: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExplorePage],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ExplorePage);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('lists every mock item by default', () => {
    expect(component.items().length).toBe(itemService.getItems()().length);
  });

  it('filters by category and toggling the same category clears the filter', () => {
    const category = component.categories()[0];

    component.toggleCategory(category);
    expect(component.items().every((item) => item.category === category)).toBe(true);

    component.toggleCategory(category);
    expect(component.selectedCategory()).toBeNull();
  });

  it('filters by search term case-insensitively', () => {
    const target = itemService.getItems()()[0];

    component.onSearch(target.title.toUpperCase());

    expect(component.items()).toEqual([target]);
  });

  it('shows no results when nothing matches', () => {
    component.onSearch('no-existe-este-item');

    expect(component.items().length).toBe(0);
  });
});
