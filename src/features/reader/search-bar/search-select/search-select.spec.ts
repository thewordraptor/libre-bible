import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSelect } from './search-select';

describe('SearchSelect', () => {
  let component: SearchSelect;
  let fixture: ComponentFixture<SearchSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
