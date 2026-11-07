import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observatorio } from './observatorio';

describe('Observatorio', () => {
  let component: Observatorio;
  let fixture: ComponentFixture<Observatorio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Observatorio],
    }).compileComponents();

    fixture = TestBed.createComponent(Observatorio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
