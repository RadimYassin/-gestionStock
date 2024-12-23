import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnityComponent } from './list-unity.component';

describe('ListUnityComponent', () => {
  let component: ListUnityComponent;
  let fixture: ComponentFixture<ListUnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUnityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
