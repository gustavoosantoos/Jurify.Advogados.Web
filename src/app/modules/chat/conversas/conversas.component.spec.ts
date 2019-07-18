import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversasComponent } from './conversas.component';

describe('ConversasComponent', () => {
  let component: ConversasComponent;
  let fixture: ComponentFixture<ConversasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
