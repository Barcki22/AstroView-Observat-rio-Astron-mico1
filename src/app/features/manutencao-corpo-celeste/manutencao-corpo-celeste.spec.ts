import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoCorpoCeleste } from './manutencao-corpo-celeste';

describe('ManutencaoCorpoCeleste', () => {
  let component: ManutencaoCorpoCeleste;
  let fixture: ComponentFixture<ManutencaoCorpoCeleste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoCorpoCeleste],
    }).compileComponents();

    fixture = TestBed.createComponent(ManutencaoCorpoCeleste);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
