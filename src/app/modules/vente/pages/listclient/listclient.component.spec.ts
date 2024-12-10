import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientComponent } from './listclient.component';

describe('listclientComponent', () => {
  let component: ListClientComponent;
  let fixture: ComponentFixture<ListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
