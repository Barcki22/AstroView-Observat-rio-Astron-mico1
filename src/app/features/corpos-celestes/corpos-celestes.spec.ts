import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorposCelestes } from './corpos-celestes';

describe('CorposCelestes', () => {
  let component: CorposCelestes;
  let fixture: ComponentFixture<CorposCelestes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorposCelestes],
    }).compileComponents();

    fixture = TestBed.createComponent(CorposCelestes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
