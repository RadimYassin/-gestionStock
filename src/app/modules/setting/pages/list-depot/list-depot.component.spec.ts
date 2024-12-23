import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepotComponent } from './list-depot.component';

describe('ListDepotComponent', () => {
  let component: ListDepotComponent;
  let fixture: ComponentFixture<ListDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDepotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
