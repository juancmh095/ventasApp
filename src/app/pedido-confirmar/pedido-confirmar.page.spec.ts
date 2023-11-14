import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoConfirmarPage } from './pedido-confirmar.page';

describe('PedidoConfirmarPage', () => {
  let component: PedidoConfirmarPage;
  let fixture: ComponentFixture<PedidoConfirmarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidoConfirmarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
