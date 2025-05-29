/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OpticavistasComponent } from './opticavistas.component';

describe('OpticavistasComponent', () => {
  let component: OpticavistasComponent;
  let fixture: ComponentFixture<OpticavistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpticavistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpticavistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
