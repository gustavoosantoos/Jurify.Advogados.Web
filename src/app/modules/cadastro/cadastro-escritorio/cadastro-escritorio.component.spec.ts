import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEscritorioComponent } from './cadastro-escritorio.component';

describe('CadastroEscritorioComponent', () => {
  let component: CadastroEscritorioComponent;
  let fixture: ComponentFixture<CadastroEscritorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroEscritorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEscritorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
