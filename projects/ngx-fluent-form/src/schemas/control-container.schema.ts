import { TemplateRef } from '@angular/core';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { AbstractControlContainerSchema } from './abstract.schema';
import { Labelful, Length, SchemaReactiveFn } from './interfaces';
import { SingleSchemaKey } from './types';

/**
 * @public
 */
export interface FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key> {
  kind: 'group';
  /* Used to define the label of the control. */
  label?: string | SchemaReactiveFn<FormGroupSchema, string>;
}

/**
 * @public
 */
export interface FormArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractControlContainerSchema<Key>, Labelful {
  kind: 'array';
  length?: Length;
  addable?: boolean | AddableButton;
  removable?: boolean;
  orderable?: boolean;
}

/**
 * @public
 */
interface AddableButton {
  type?: NzButtonType;
  icon?: string;
  content?: string | TemplateRef<void>;
  size?: NzButtonSize;
  variants?: {
    block?: boolean;
    shape?: NzButtonShape;
    danger?: boolean;
    ghost?: boolean;
  }
}
