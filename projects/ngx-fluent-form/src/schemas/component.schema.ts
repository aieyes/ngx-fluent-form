import { TemplateRef } from '@angular/core';
import { ThemeType } from '@ant-design/icons-angular';
import { NzButtonShape, NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';
import { NzFormTextComponent } from 'ng-zorro-antd/form';
import { AbstractComponentSchema, AbstractElementSchema, AbstractSchema, CallbackArgs, Labelful, SchemaName } from './abstract.schema';

/** @internal */
interface Icon {
  type: string;
  theme?: ThemeType;
  spin?: boolean;
  rotate?: number;
}

export interface TextComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractComponentSchema<NzFormTextComponent>, Labelful {
  kind: 'text';
  content: string | TemplateRef<void>;
}

export interface ButtonComponentSchema<Name extends SchemaName = SchemaName> extends AbstractSchema<Name>, AbstractElementSchema<HTMLButtonElement>, Labelful {
  kind: 'button';
  type?: NzButtonType;
  mode?: 'submit' | 'reset' | 'menu';
  disabled?: boolean | ((arg: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  ghost?: boolean | ((arg: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  danger?: boolean | ((arg: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  loading?: boolean | ((arg: CallbackArgs<ButtonComponentSchema<SchemaName>>) => boolean) | string;
  shape?: NzButtonShape;
  size?: NzButtonSize;
  block?: boolean;
  icon?: string | Icon;
  content?: string | TemplateRef<void>;
}
