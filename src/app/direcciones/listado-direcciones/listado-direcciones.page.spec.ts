import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoDireccionesPage } from './listado-direcciones.page';

describe('ListadoDireccionesPage', () => {
  let component: ListadoDireccionesPage;
  let fixture: ComponentFixture<ListadoDireccionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListadoDireccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
