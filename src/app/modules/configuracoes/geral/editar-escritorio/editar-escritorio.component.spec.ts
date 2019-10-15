import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEscritorioComponent } from './editar-escritorio.component';

describe('EditarEscritorioComponent', () => {
  let component: EditarEscritorioComponent;
  let fixture: ComponentFixture<EditarEscritorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEscritorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEscritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
