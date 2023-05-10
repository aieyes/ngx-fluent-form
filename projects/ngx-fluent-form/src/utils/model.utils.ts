import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AnySchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
import { Model } from '../types';
import { isComponentContainerSchema, isControlWrapperSchema, isNonControlSchema } from './schema.utils';
import { valueUtils } from './value.utils';

@Injectable({
  providedIn: 'root'
})
export class ModelUtil {

  /**
   * 将模型的值赋值到表单
   * @param form
   * @param emitEvent 是否发射事件，函数内部递归调用的时候将置为false，保证只会触发一次事件
   * @returns form
   */
  updateForm<F extends FormGroup | FormArray, M extends Model<F>>(model: M, schemas: StandardSchema<AnySchema>[], form: F, emitEvent = true): F {
    schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isNonControlSchema(schema)) return;

      if (schema.kind === 'group') {
        this.updateForm(
          (model[schema.name as keyof M] ??= {} as M[keyof M]) as Model<FormGroup>,
          schema.schemas,
          form.get([schema.name!]) as FormGroup,
          false
        );
        return;
      }

      if (schema.kind === 'array') {
        this.updateForm(
          (model[schema.name as keyof M] ??= [] as M[keyof M]) as Model<FormArray>,
          schema.schemas,
          form.get([schema.name!]) as FormArray,
          false
        );
        return;
      }

      if (isComponentContainerSchema(schema) || isControlWrapperSchema(schema)) {
        this.updateForm(model, schema.schemas, form, false);
        return;
      }

      const value = valueUtils(model, schema).getValue();

      form.get([schema.name!.toString()])!.setValue(value, { emitEvent: false });
    });

    emitEvent && form.updateValueAndValidity();

    return form;
  }
}
