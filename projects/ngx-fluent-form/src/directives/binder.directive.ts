import { Directive, ElementRef, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { asapScheduler, fromEvent, observeOn, takeUntil } from 'rxjs';
import { AbstractComponentControlSchema, AbstractElementControlSchema, AbstractElementSchema } from '../schemas';
import { ComponentOutputListenerMap, HTMLElementEventListenerMap } from '../types';

@Directive({
  selector: '[fluentBinderSchema]',
  standalone: true,
  providers: [NzDestroyService]
})
export class FluentBinderDirective<
  E extends HTMLElement,
  C extends object,
  S extends AbstractElementSchema<E> | AbstractComponentControlSchema<C, SafeAny> | AbstractElementControlSchema<E, SafeAny>
> implements OnChanges {
  @Input('fluentBinder') component?: C;
  @Input('fluentBinderSchema') schema!: S;
  @Input('fluentBinderControl') control?: AbstractControl;

  private get host(): C | E {
    return this.component ?? this.elementRef.nativeElement;
  }

  constructor(
    private elementRef: ElementRef<E>,
    private destory$: NzDestroyService
  ) { }

  ngOnChanges({ schema }: SimpleChanges): void {
    schema.firstChange || this.destory$.next();

    this.schema.property && Object.keys(this.schema.property).forEach(property => {
      const value = this.schema.property![property as keyof typeof this.schema.property];
      this.host[property as keyof (C | E)] = value as (C | E)[keyof (C | E)];
    });

    this.schema.listener && Object.keys(this.schema.listener).forEach(eventName => {
      if (eventName === 'valueChange' && eventName in this.schema.listener!) {
        this.control!.valueChanges.pipe(
          observeOn(asapScheduler), // 微任务调度，确保顶层事件先发射
          takeUntil(this.destory$),
        ).subscribe(this.schema.listener[eventName]);
      } else if (eventName === 'statusChange' && eventName in this.schema.listener!) {
        this.control!.statusChanges.pipe(
          observeOn(asapScheduler),
          takeUntil(this.destory$),
        ).subscribe(this.schema.listener[eventName]);
      } else if (this.host instanceof HTMLElement) {
        fromEvent(this.host, eventName).pipe(
          takeUntil(this.destory$)
        ).subscribe(event => {
          (this.schema.listener as HTMLElementEventListenerMap)![
            eventName as keyof HTMLElementEventListenerMap
          ]!(event as SafeAny);
        });
      } else {
        (this.host[eventName as keyof C] as EventEmitter<unknown>).pipe(
          takeUntil(this.destory$)
        ).subscribe((event: SafeAny) => {
          (this.schema.listener as ComponentOutputListenerMap<C>)![
            eventName as keyof ComponentOutputListenerMap<C>
          ]!(event);
        });
      }
    });
  }
}
