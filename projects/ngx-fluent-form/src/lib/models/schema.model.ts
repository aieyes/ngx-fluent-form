import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Property, SafeAny } from '@ngify/types';
import { NzCascaderComponent, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzDateMode, NzDatePickerComponent, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzSelectComponent, NzSelectModeType } from 'ng-zorro-antd/select';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { ComponentEventListenerMap, ComponentInput, HTMLElementEventListenerMap } from '../fluent-form.type';
import { Builder } from '../utils/builder.utils';

export type ControlName = number | string | readonly [string, string];

export type AnyControlSchema = VirtualControlSchema | RealControlSchema;
export type AnyControlBuilder = Builder<AnyControlSchema, AnyControlSchema, {}>;

export type VirtualControlSchema = GroupSchema | ArraySchema;
export type VirtualControlBuilder = Builder<VirtualControlSchema, VirtualControlSchema, {}>;

export type RealControlSchema =
  InputControlSchema |
  TextareaControlSchema |
  NumberInputControlSchema |
  DatePickerControlSchema |
  RangePickerControlSchema |
  TimePickerControlSchema |
  SwitchControlSchema |
  SelectControlSchema |
  CascaderControlSchema |
  SliderControlSchema |
  RadioControlSchema |
  CheckboxControlSchema |
  RateControlSchema;
export type RealControlBuilder = Builder<RealControlSchema, RealControlSchema, {}>;

export interface AbstractControlSchema<N extends ControlName> {
  /** Type of control */
  type: string;
  /** Field name for control */
  name: N;
  /** Span of the control in grid layout */
  span?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  /** Label for control */
  label?: string;
}

export interface AbstractRealControlSchema<N extends ControlName = ControlName, Value = any> extends AbstractControlSchema<N> {
  /** I/O mapper for control */
  mapper?: {
    /** An input mapper that maps from a model's value to a form control's value */
    input: (value?: SafeAny) => SafeAny,
    /** An output mapper that maps from a form control's value to a model's value */
    output: (value?: SafeAny) => SafeAny,
  };
  value?: Value;
  /** Is it a required control */
  required?: boolean;
  /** Whether to disable control */
  disabled?: boolean;
  /** Error message for control */
  errorTip?: string;
  /** Validator for the control */
  validator?: ValidatorFn[];
  /** Async validators for control */
  asyncValidator?: AsyncValidatorFn[];
}

export interface GroupSchema extends AbstractControlSchema<string | number> {
  type: 'group';
  /** Schema for form group */
  schemas: (AnyControlSchema | Builder<AnyControlSchema, AnyControlSchema, {}>)[];
}

export interface ArraySchema extends AbstractControlSchema<string | number> {
  type: 'array';
  /** Schema for form array */
  schemas: (AnyControlSchema | Builder<AnyControlSchema, AnyControlSchema, {}>)[];
}

export interface InputControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'text' | 'email' | 'password';
  /** Placeholder text */
  placeholder?: string;
  /** The pre-label of the input box */
  before?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The back label of the input box */
  after?: {
    icon?: string,
    template?: string | TemplateRef<void>
  };
  /** The prefix of the input box */
  prefix?: string | TemplateRef<void>;
  /** The suffix of the input box */
  suffix?: string | TemplateRef<void>;
  /** Control value change callback */
  change?: (value: string, schema: InputControlSchema) => void;
  /** event listeners */
  listener?: HTMLElementEventListenerMap<InputControlSchema>;
  /** Other properties that need to be bound */
  property?: Partial<Property<HTMLInputElement>>;
}

export interface TextareaControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'textarea';
  /** Placeholder text */
  placeholder?: string;
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
  /** Control value change callback */
  change?: (value: string, schema: TextareaControlSchema) => void;
  /** event listeners */
  listener?: HTMLElementEventListenerMap<TextareaControlSchema>;
  /** Other properties that need to be bound */
  property?: Partial<Property<HTMLTextAreaElement>>;
}

export interface NumberInputControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'number';
  /** Placeholder text */
  placeholder?: string;
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Decimal precision */
  precision?: number;
  /** Decimal precision mode */
  precisionMode?: NzInputNumberComponent['nzPrecisionMode'];
  /** Step length */
  step?: number;
  /** Control value change callback */
  change?: (value: number, schema: NumberInputControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzInputNumberComponent, NumberInputControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzInputNumberComponent>;
}

interface DateControlSchema {
  /** Mode of date picker control */
  mode?: NzDateMode;
  /** Show clean button */
  clear?: boolean;
  /** Show time picker in date picker */
  showTime?: boolean;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
}

export interface DatePickerControlSchema extends AbstractRealControlSchema, DateControlSchema {
  type: 'date';
  /** Placeholder text */
  placeholder?: string;
  /** Control value change callback */
  change?: (value: Date, schema: DatePickerControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzDatePickerComponent, DatePickerControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzDatePickerComponent>;
}

export interface RangePickerControlSchema extends AbstractRealControlSchema<ControlName>, DateControlSchema {
  type: 'range';
  /** Placeholder text */
  placeholder?: [string, string];
  /** Control value change callback */
  change?: (value: [Date, Date], schema: DatePickerControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRangePickerComponent, RangePickerControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRangePickerComponent>;
}

export interface TimePickerControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'time';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Time display format */
  format?: string;
  /** Time step length */
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
  /** Control value change callback */
  change?: (value: Date, schema: TimePickerControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzTimePickerComponent, TimePickerControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzTimePickerComponent>;
}

export interface SwitchControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'switch';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  /** Control value change callback */
  change?: (value: boolean, schema: SwitchControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSwitchComponent, SwitchControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSwitchComponent>;
}

export interface SelectControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'select';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Mode of select control */
  mode?: NzSelectModeType;
  /** Max selected */
  limit?: number;
  /** Support search */
  search?: boolean;
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny | SafeAny[], schema: SelectControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSelectComponent, SelectControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSelectComponent>;
}

export interface CascaderControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'cascader';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Expand trigger for cascader control */
  trigger?: NzCascaderComponent['nzExpandTrigger'];
  /** Support search, cannot be used with `options.load` */
  search?: boolean;
  options: NzCascaderOption[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny[], schema: CascaderControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzCascaderComponent, CascaderControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzCascaderComponent>;
}

export interface SliderControlSchema extends AbstractRealControlSchema<ControlName> {
  type: 'slider';
  /** Placeholder text */
  placeholder?: never;
  /** Containment relationship */
  included?: boolean;
  /** Maximum value */
  max?: number;
  /** Minimum value */
  min?: number;
  /** Range slider mode */
  range?: boolean;
  /** Step length */
  step?: number;
  /** Control value change callback */
  change?: (value: number | number[], schema: SliderControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzSliderComponent, SliderControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSliderComponent>;
}

export interface RadioControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'radio';
  /** Radio control style */
  style?: 'outline' | 'solid';
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny, schema: RadioControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRadioGroupComponent, RadioControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRadioGroupComponent>;
}

export interface CheckboxControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'checkbox';
  options: Record<string, unknown>[];
  config?: {
    labelProperty?: string;
    valueProperty?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny[], schema: CheckboxControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzCheckboxGroupComponent, CheckboxControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzCheckboxGroupComponent>;
}

export interface RateControlSchema extends AbstractRealControlSchema<string | number> {
  type: 'rate';
  /** Show clean button */
  clear?: boolean;
  /** whether to allow semi selection */
  half?: boolean;
  /** star count */
  count?: number;
  /** custom character of rate */
  character?: TemplateRef<void>;
  /** Customize tooltip by each character */
  tooltips?: string[];
  /** Control value change callback */
  change?: (value: number, schema: RateControlSchema) => void;
  /** event listeners */
  listener?: ComponentEventListenerMap<NzRateComponent, RateControlSchema>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRateComponent>;
}