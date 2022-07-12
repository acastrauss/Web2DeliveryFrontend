import { TestBed } from '@angular/core/testing';

import { LoginFormsGuard } from './login-forms.guard';

describe('LoginFormsGuard', () => {
  let guard: LoginFormsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginFormsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
