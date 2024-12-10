import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTvaComponent } from './list-tva.component';

describe('ListTVAComponent', () => {
  let component: ListTvaComponent;
  let fixture: ComponentFixture<ListTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTvaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
