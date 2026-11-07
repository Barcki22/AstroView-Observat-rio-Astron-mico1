import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalheCorpoCeleste } from './detalhe-corpo-celeste';

describe('DetalheCorpoCeleste', () => {
  let component: DetalheCorpoCeleste;
  let fixture: ComponentFixture<DetalheCorpoCeleste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheCorpoCeleste],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheCorpoCeleste);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
