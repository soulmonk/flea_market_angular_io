import {TestBed} from '@angular/core/testing';

import {TokenInterceptor} from './token.interceptor';

describe('TokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenInterceptor = TestBed.get(TokenInterceptor);
    expect(service).toBeTruthy();
  });
});
