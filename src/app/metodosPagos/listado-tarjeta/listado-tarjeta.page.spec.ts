import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoTarjetaPage } from './listado-tarjeta.page';

describe('ListadoTarjetaPage', () => {
  let component: ListadoTarjetaPage;
  let fixture: ComponentFixture<ListadoTarjetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListadoTarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
