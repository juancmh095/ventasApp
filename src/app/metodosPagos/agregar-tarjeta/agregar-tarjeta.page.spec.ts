import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTarjetaPage } from './agregar-tarjeta.page';

describe('AgregarTarjetaPage', () => {
  let component: AgregarTarjetaPage;
  let fixture: ComponentFixture<AgregarTarjetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarTarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
