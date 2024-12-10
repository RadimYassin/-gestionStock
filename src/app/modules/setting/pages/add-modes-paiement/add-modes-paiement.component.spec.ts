import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModesPaiementComponent } from './add-modes-paiement.component';

describe('AddModesPaiementComponent', () => {
  let component: AddModesPaiementComponent;
  let fixture: ComponentFixture<AddModesPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModesPaiementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModesPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
