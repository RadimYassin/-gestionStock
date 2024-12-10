import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreceptionComponent } from './listreception.component';

describe('ListreceptionComponent', () => {
  let component: ListreceptionComponent;
  let fixture: ComponentFixture<ListreceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListreceptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListreceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
