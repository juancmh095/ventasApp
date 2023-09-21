import { TestBed } from '@angular/core/testing';

import { TokenHttpInterceptor } from './token-http.interceptor';

describe('TokenHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenHttpInterceptor = TestBed.inject(TokenHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
