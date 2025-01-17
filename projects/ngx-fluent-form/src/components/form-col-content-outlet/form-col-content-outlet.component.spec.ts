import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { withAllWidgets } from '../../features';
import { provideFluentForm } from '../../provider';
import { FluentFormColContentOutletComponent } from './form-col-content-outlet.component';

describe('FluentFormColContentOutletComponent', () => {
  let component: FluentFormColContentOutletComponent<AnyObject | AnyArray>;
  let fixture: ComponentFixture<FluentFormColContentOutletComponent<AnyObject | AnyArray>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    fixture = TestBed.createComponent(FluentFormColContentOutletComponent);
    component = fixture.componentInstance;
    component.control = new FormGroup({});
    component.schema = { kind: 'button' };
    component.model = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
