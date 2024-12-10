import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeLivraisonComponent } from './edite-livraison.component';

describe('EditeLivraisonComponent', () => {
  let component: EditeLivraisonComponent;
  let fixture: ComponentFixture<EditeLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditeLivraisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
