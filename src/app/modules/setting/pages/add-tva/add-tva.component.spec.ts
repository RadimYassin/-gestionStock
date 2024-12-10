import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTvaComponent } from './add-tva.component';

describe('AddTVAComponent', () => {
  let component: AddTvaComponent;
  let fixture: ComponentFixture<AddTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTvaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
