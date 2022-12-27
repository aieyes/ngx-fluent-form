import { NgClass, NgStyle } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { FluentBinderDirective, FluentComposableDirective, FluentWithContextGuardDirective } from '../../directives';
import { FluentCallPipe, FluentTypeofPipe } from '../../pipes';
import { FluentInvokePipe } from '../../pipes/invoke.pipe';
import { TreeSelectControlSchema } from '../../schemas';
import { isBoolean, isUndefined } from '../../utils';
import { AbstractWidget, COL_HELPER, WidgetTemplateContext } from '../abstract.widget';

type TreeSelectWidgetTemplateContext = WidgetTemplateContext<TreeSelectControlSchema, FormControl<SafeAny[]>>;

@Component({
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzTreeSelectModule,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentComposableDirective,
    FluentTypeofPipe,
    FluentCallPipe,
    FluentInvokePipe
  ],
  templateUrl: './tree-select.widget.html',
  styles: [`nz-tree-select { width: 100% }`]
})
export class TreeSelectWidget extends AbstractWidget<TreeSelectWidgetTemplateContext> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<TreeSelectWidgetTemplateContext>;

  protected readonly helper = {
    col: COL_HELPER,
    checkable: (checkable: TreeSelectControlSchema['checkable']) =>
      isBoolean(checkable) ? checkable : !isUndefined(checkable?.strict),
    checkStrictly: (checkable: TreeSelectControlSchema['checkable']) =>
      isBoolean(checkable) || !checkable?.strict ? false : checkable.strict,
    showExpand: (expandIcon: TreeSelectControlSchema['expandIcon']) =>
      isBoolean(expandIcon) ? expandIcon : true,
    expandedIcon: (expandIcon: TreeSelectControlSchema['expandIcon']) =>
      isBoolean(expandIcon) ? undefined : expandIcon
  } as const;
}
