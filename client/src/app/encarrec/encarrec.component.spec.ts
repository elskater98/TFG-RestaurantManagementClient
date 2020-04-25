import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncarrecComponent } from './encarrec.component';

describe('EncarrecComponent', () => {
  let component: EncarrecComponent;
  let fixture: ComponentFixture<EncarrecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncarrecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncarrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
