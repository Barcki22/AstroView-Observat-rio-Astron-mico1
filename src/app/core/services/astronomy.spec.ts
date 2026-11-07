import { TestBed } from '@angular/core/testing';
import { Astronomy } from './astronomy';

describe('Astronomy', () => {
  let service: Astronomy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Astronomy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
