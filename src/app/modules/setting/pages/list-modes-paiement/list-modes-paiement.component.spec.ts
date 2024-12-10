import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModesPaiementComponent } from './list-modes-paiement.component';

describe('ListModesPaiementComponent', () => {
  let component: ListModesPaiementComponent;
  let fixture: ComponentFixture<ListModesPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListModesPaiementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModesPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
