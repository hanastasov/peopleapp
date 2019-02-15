import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleShellComponent } from './people-shell.component';

describe('PeopleShellComponent', () => {
  let component: PeopleShellComponent;
  let fixture: ComponentFixture<PeopleShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
