import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertViewComponent } from './simple-page.component';

describe('OffertViewComponent', () => {
  let component: OffertViewComponent;
  let fixture: ComponentFixture<OffertViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffertViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffertViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
