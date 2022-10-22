import { AbstractControl } from '@angular/forms';
import { AnySchema } from '../../schemas';
import { AnyArray, AnyObject } from '../../types';
import { FluentFormNameDirective } from '../form-name.directive';
import { FluentFormDirective } from '../form.directive';

/**
 * 抽象的控件容器
 */
export abstract class ControlContainer<T extends AnyObject | AnyArray> {
  protected _schemas!: AnySchema[];
  get schemas(): AnySchema[] {
    return this._schemas;
  }
  set schemas(value: AnySchema[]) {
    this._schemas = value;
  }

  /** 当前表单 */
  form!: AbstractControl;
  /** 当前模型 */
  model!: T;

  /** 当前容器的指令 */
  abstract get directive(): FluentFormDirective<T> | FluentFormNameDirective<T>;

}