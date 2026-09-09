import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryPage } from './history.page';

describe('HistoryPage', () => {
  let component: HistoryPage;
  let fixture: ComponentFixture<HistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('groups entries under a single heading per date', () => {
    const dates = component.groups().map((group) => group.date);
    expect(new Set(dates).size).toBe(dates.length);
  });

  it('maps each status to a badge color', () => {
    expect(component.statusColor('Devuelto')).toBe('success');
    expect(component.statusColor('Activo')).toBe('secondary');
    expect(component.statusColor('Atrasado')).toBe('danger');
  });
});
