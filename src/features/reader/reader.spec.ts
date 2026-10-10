import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reader } from './reader';

describe('Reader', () => {
  let component: Reader;
  let fixture: ComponentFixture<Reader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reader],
    }).compileComponents();

    fixture = TestBed.createComponent(Reader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
