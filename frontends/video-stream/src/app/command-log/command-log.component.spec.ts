import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandLogComponent } from './command-log.component';

describe('CommandLogComponent', () => {
  let component: CommandLogComponent;
  let fixture: ComponentFixture<CommandLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
