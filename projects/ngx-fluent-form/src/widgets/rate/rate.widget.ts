import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FluentBinderDirective, FluentWithContextGuardDirective } from '../../directives';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type RateWidgetTemplateContext = WidgetTemplateContext<any>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzRateModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
  ],
  templateUrl: './rate.widget.html',
})
export class RateWidget extends AbstractWidget<RateWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<RateWidgetTemplateContext>;
}