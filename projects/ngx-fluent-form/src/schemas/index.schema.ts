import { StableBuilder } from '../compose';
import { RowComponentSchema, SpaceComponentSchema, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsComponentSchema } from './component-container.schema';
import { ButtonGroupComponentSchema } from './component-wrapper.schema';
import { AlertComponentSchema, ButtonComponentSchema, HeadingComponentSchema, TemplateSchema, TextComponentSchema } from './component.schema';
import { FormArraySchema, FormGroupSchema } from './control-container.schema';
import { InputGroupComponentSchema, NumberGroupComponentSchema } from './control-wrapper.schema';
import { CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, HeadlessControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from './control.schema';
import { SingleSchemaKey } from './types';

/** 任意图示 */
export type AnySchema =
  | AnyControlSchema
  | AnyContainerSchema
  | AnyComponentSchema
  | AnyWrapperSchema;
/** 任意构建器 */
export type AnyBuilder = StableBuilder<AnySchema>;

/** 控件或控件容器图示 */
export type AnyControlOrControlContainerSchema = AnyControlContainerSchema | AnyControlSchema;
/** 控件或控件容器构建器 */
export type AnyControlOrControlContainerBuilder = StableBuilder<AnyControlOrControlContainerSchema>;

/** 任意容器图示 */
export type AnyContainerSchema = AnyControlContainerSchema | AnyComponentContainerSchema;
/** 任意容器构建器 */
export type AnyContainerBuilder = StableBuilder<AnyContainerSchema>;

/** 任意包装器图示 */
export type AnyWrapperSchema = AnyControlWrapperSchema | AnyComponentWrapperSchema;
/** 任意包装器构建器 */
export type AnyWrapperBuilder = StableBuilder<AnyWrapperSchema>;

/** 任意控件包装器图示 */
export type AnyControlWrapperSchema<Key extends SingleSchemaKey = SingleSchemaKey> =
  | InputGroupComponentSchema<Key>
  | NumberGroupComponentSchema<Key>;
/** 任意控件包装器构建器 */
export type AnyControlWrapperBuilder<Key extends SingleSchemaKey = SingleSchemaKey> = StableBuilder<AnyControlWrapperSchema<Key>>;

/** 任意组件容器图示 */
export type AnyComponentContainerSchema<Key extends SingleSchemaKey = SingleSchemaKey> =
  | StepsComponentSchema<Key>
  | StepComponentSchema<Key>
  | TabsComponentSchema<Key>
  | TabComponentSchema<Key>
  | SpaceComponentSchema<Key>
  | RowComponentSchema<Key>;
/** 任意组件容器构建器 */
export type AnyComponentContainerBuilder<Key extends SingleSchemaKey = SingleSchemaKey> = StableBuilder<AnyComponentContainerSchema<Key>>;

/** 任意控件容器图示 */
export type AnyControlContainerSchema<Key extends SingleSchemaKey = SingleSchemaKey> = FormGroupSchema<Key> | FormArraySchema<Key>;
/** 任意控件容器构建器 */
export type AnyControlContainerBuilder<Key extends SingleSchemaKey = SingleSchemaKey> = StableBuilder<AnyControlContainerSchema<Key>>;

/** 组件容器图示 */
export type AnyComponentWrapperSchema = ButtonGroupComponentSchema;
/** 组件容器构建器 */
export type AnyComponentWrapperBuilder = StableBuilder<AnyComponentWrapperSchema>;

/** 普通组件图示 */
export type AnyComponentSchema<Key extends SingleSchemaKey = SingleSchemaKey> =
  | TemplateSchema<Key>
  | ButtonComponentSchema<Key>
  | TextComponentSchema<Key>
  | HeadingComponentSchema<Key>
  | AlertComponentSchema<Key>;
/** 普通组件构建器 */
export type AnyComponentBuilder<Key extends SingleSchemaKey = SingleSchemaKey> = StableBuilder<AnyComponentSchema<Key>>;

/** 可组合组件图示 */
export type ComposableComponentSchema =
  | InputControlSchema
  | TextareaControlSchema
  | NumberInputControlSchema
  | DatePickerControlSchema
  | TimePickerControlSchema
  | DateRangePickerControlSchema
  | SelectControlSchema
  | CascaderControlSchema
  | TreeSelectControlSchema
  | ButtonComponentSchema;
/** 可组合组件构建器 */
export type ComposableComponentBuilder = StableBuilder<ComposableComponentSchema>;

/** 单字段的真实控件图示 */
export type AnyControlSchema =
  | InputControlSchema
  | TextareaControlSchema
  | NumberInputControlSchema
  | DatePickerControlSchema
  | TimePickerControlSchema
  | ToggleControlSchema
  | SelectControlSchema
  | CascaderControlSchema
  | TreeSelectControlSchema
  | RadioGroupControlSchema
  | CheckboxControlSchema
  | CheckboxGroupControlSchema
  | RateControlSchema
  | DateRangePickerControlSchema
  | SliderControlSchema
  | HeadlessControlSchema;
/** 单字段的真实控件构建器 */
export type AnyControlBuilder = StableBuilder<AnyControlSchema>;
