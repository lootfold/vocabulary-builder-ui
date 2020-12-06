import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewItemListComponent } from './view-item-list.component';

describe('ViewItemsComponent', () => {
  let component: ViewItemListComponent;
  let fixture: ComponentFixture<ViewItemListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
