import { inject, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractSchema } from '../schemas';
import { ValueTransformer } from '../services';

@Pipe({
  name: 'call',
  standalone: true
})
export class FluentCallPipe implements PipeTransform {
  private readonly transformer = inject(ValueTransformer);

  transform<T extends [unknown, AbstractSchema, AbstractControl]>(
    value: boolean | ((...args: SafeAny[]) => boolean) | string | undefined,
    ...[model, schema, control]: T
  ): boolean {
    return this.transformer.transform(value, { model, schema, control }) ?? false;
  }

}
