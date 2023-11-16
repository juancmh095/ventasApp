import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoInfoPage } from './pedido-info.page';

describe('PedidoInfoPage', () => {
  let component: PedidoInfoPage;
  let fixture: ComponentFixture<PedidoInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidoInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
