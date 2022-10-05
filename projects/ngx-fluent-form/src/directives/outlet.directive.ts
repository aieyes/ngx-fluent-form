import { ComponentFactoryResolver, Directive, Host, Injector, Input, OnChanges, OnDestroy, OnInit, SkipSelf, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FluentControlOutletComponent, FluentControlTemplateContext } from '../components';
import { ComponentSchema, ControlSchema } from '../schemas';
import { Arr, Obj } from '../types';
import { ControlContainer } from './models/control-container';

@Directive({
  // eslint-disable-next-line
  selector: 'fluent-outlet',
  exportAs: 'fluentOutlet',
  host: {
    '[style.display]': `'none'`
  }
})
export class FluentOutletDirective<T extends Obj | Arr> implements OnInit, OnChanges, OnDestroy, FluentControlTemplateContext<T> {
  @Input() name!: string | number;

  schema!: ComponentSchema | ControlSchema;
  control!: AbstractControl;
  classful: boolean = true;

  get model(): T {
    return this.controlContainer.directive.model as T;
  }

  constructor(
    injector: Injector,
    viewContainerRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    @Host() @SkipSelf()
    private controlContainer: ControlContainer<T>,
  ) {
    // TODO v14.1 后使用 createComponent() 替代 ComponentFactoryResolver
    const { instance } = componentFactoryResolver.resolveComponentFactory(FluentControlOutletComponent).create(injector);
    viewContainerRef.createEmbeddedView(instance.controlTemplateRef, this);
  }

  ngOnInit() {
    this.controlContainer.directive.addDirective(this);
  }

  ngOnChanges() {
    this.controlContainer.directive.assignDirective(this);
  }

  ngOnDestroy() {
    this.controlContainer.directive.removeDirective(this);
  }

}
