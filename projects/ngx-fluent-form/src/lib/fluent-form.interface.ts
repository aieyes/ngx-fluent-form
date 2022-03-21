import { EventEmitter, TemplateRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { Property, SafeAny } from '@ngify/types';
import { NzCascaderComponent, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzDatePickerComponent, NzRangePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzRateComponent } from 'ng-zorro-antd/rate';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';

export type AnyControlOptions =
  EmbeddedFormOptions
  | InputControlOptions
  | TextareaControlOptions
  | NumberInputControlOptions
  | DatePickerControlOptions
  | RangePickerControlOptions
  | TimePickerControlOptions
  | SwitchControlOptions
  | SelectControlOptions
  | CascaderControlOptions
  | SliderControlOptions
  | RadioControlOptions
  | CheckboxControlOptions
  | RateControlOptions;

/** HTML 元素的事件侦听器对象 */
export type HTMLElementEventListener<O extends AnyControlOptions> = {
  [K in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[K], options: O) => void
};

/** 组件的事件名 */
type ComponentEventName<C> = Exclude<{
  [K in keyof C]: C[K] extends EventEmitter<SafeAny> ? K : never
}[keyof C], undefined>;

/** 组件的事件侦听器对象 */
export type ComponentEventListener<C, O extends AnyControlOptions> = {
  [K in ComponentEventName<C>]?: (event: C[K] extends EventEmitter<infer E> ? E : never, options: O) => void
}

/** 组件属性 */
type ComponentProperty<C> = Omit<Property<C>, ComponentEventName<C>>;
/** NZ 组件的 Input 名字 */
type ComponentInputName<C> = Extract<keyof ComponentProperty<C>, `nz${Capitalize<string>}`>;
/** NZ 组件的 Input Map */
type ComponentInput<C> = Partial<{ [P in ComponentInputName<C>]: C[P] }>;

export interface BaseFormControlOptions<Name extends string | [string, string] = string> {
  /** Type of control */
  type: string;
  /** Field name for control */
  name: Name;
  /** Span of the control in grid layout */
  span: number;
  /** Label for control */
  label?: string;
}

export interface RealFormControlOptions<Name extends string | [string, string] = string> extends BaseFormControlOptions<Name> {
  /** I/O mapper for control */
  mapper?: {
    /** An input mapper that maps from a model's value to a form control's value */
    input: (value?: SafeAny) => SafeAny,
    /** An output mapper that maps from a form control's value to a model's value */
    output: (value?: SafeAny) => SafeAny,
  };
  /** Is it a required control */
  required?: boolean;
  /** Whether to disable control */
  disabled?: boolean;
  /** Error message for control */
  errorTip?: string;
  /** Validator for the control */
  validator?: ValidatorFn | ValidatorFn[];
  /** Async validators for control */
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[];
}

export interface EmbeddedFormOptions extends BaseFormControlOptions {
  type: 'embed';
  /** Schema for embedded form */
  schema: AnyControlOptions[];
}

export interface InputControlOptions extends RealFormControlOptions {
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
  change?: (value: string, options: InputControlOptions) => void;
  /** event listeners */
  listener?: HTMLElementEventListener<InputControlOptions>;
  /** Other properties that need to be bound */
  property?: Partial<Property<HTMLInputElement>>;
}

export interface TextareaControlOptions extends RealFormControlOptions {
  type: 'textarea';
  /** Placeholder text */
  placeholder?: string;
  /** The number of lines in the text field */
  rows?: number;
  /** Whether to adapt the content height */
  autosize?: boolean | { minRows: number, maxRows: number };
  /** Control value change callback */
  change?: (value: string, options: TextareaControlOptions) => void;
  /** event listeners */
  listener?: HTMLElementEventListener<TextareaControlOptions>;
  /** Other properties that need to be bound */
  property?: Partial<Property<HTMLTextAreaElement>>;
}

export interface NumberInputControlOptions extends RealFormControlOptions {
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
  change?: (value: number, options: NumberInputControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzInputNumberComponent, NumberInputControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzInputNumberComponent>;
}

interface DateControlOptions {
  /** Mode of date picker control */
  mode?: NzDatePickerComponent['nzMode'];
  /** Show clean button */
  clear?: boolean;
  /** Show time picker in date picker */
  showTime?: boolean;
  /** Date display format */
  format?: string;
  /** Inline mode */
  inline?: boolean;
}

export interface DatePickerControlOptions extends RealFormControlOptions, DateControlOptions {
  type: 'date';
  /** Placeholder text */
  placeholder?: string;
  /** Control value change callback */
  change?: (value: Date, options: DatePickerControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzDatePickerComponent, DatePickerControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzDatePickerComponent>;
}

export interface RangePickerControlOptions extends RealFormControlOptions<string | [string, string]>, DateControlOptions {
  type: 'range';
  /** Placeholder text */
  placeholder?: [string, string];
  /** Control value change callback */
  change?: (value: [Date, Date], options: DatePickerControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzRangePickerComponent, RangePickerControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRangePickerComponent>;
}

export interface TimePickerControlOptions extends RealFormControlOptions {
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
  change?: (value: Date, options: TimePickerControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzTimePickerComponent, TimePickerControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzTimePickerComponent>;
}

export interface SwitchControlOptions extends RealFormControlOptions {
  type: 'switch';
  /** Placeholder text */
  placeholder?: [string | TemplateRef<void>, string | TemplateRef<void>];
  /** Control value change callback */
  change?: (value: boolean, options: SwitchControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzSwitchComponent, SwitchControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSwitchComponent>;
}

export interface SelectControlOptions extends RealFormControlOptions {
  type: 'select';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Mode of select control */
  mode?: NzSelectComponent['nzMode'];
  /** Max selected */
  limit?: number;
  /** Support search */
  search?: boolean;
  options: {
    /** Options data array */
    data: Record<string, SafeAny>,
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny | SafeAny[], options: SelectControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzSelectComponent, SelectControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSelectComponent>;
}

export interface CascaderControlOptions extends RealFormControlOptions {
  type: 'cascader';
  /** Placeholder text */
  placeholder?: string;
  /** Show clean button */
  clear?: boolean;
  /** Expand trigger for cascader control */
  trigger?: NzCascaderComponent['nzExpandTrigger'];
  /** Support search, cannot be used with `options.load` */
  search?: boolean;
  options: {
    /** Options data array */
    data?: NzCascaderOption[];
    /** Load options data asynchronously */
    load?: NzCascaderComponent['nzLoadData'];
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny[], options: CascaderControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzCascaderComponent, CascaderControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzCascaderComponent>;
}

export interface SliderControlOptions extends RealFormControlOptions<string | [string, string]> {
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
  change?: (value: number | number[], options: SliderControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzSliderComponent, SliderControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzSliderComponent>;
}

export interface RadioControlOptions extends RealFormControlOptions {
  type: 'radio';
  /** Radio control style */
  style?: 'outline' | 'solid';
  options: {
    /** Options data array */
    data: Record<string, SafeAny>[],
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny, options: RadioControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzRadioGroupComponent, RadioControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRadioGroupComponent>;
}

export interface CheckboxControlOptions extends RealFormControlOptions {
  type: 'checkbox';
  options: {
    /** Options data array */
    data: Record<string, SafeAny>[],
    /** In the options object, the property name corresponding to the label */
    label?: string;
    /** In the options object, the property name corresponding to the value */
    value?: string;
  };
  /** Control value change callback */
  change?: (value: SafeAny[], options: CheckboxControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzCheckboxGroupComponent, CheckboxControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzCheckboxGroupComponent>;
}

export interface RateControlOptions extends RealFormControlOptions {
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
  change?: (value: number, options: RateControlOptions) => void;
  /** event listeners */
  listener?: ComponentEventListener<NzRateComponent, RateControlOptions>;
  /** Other properties that need to be bound */
  property?: ComponentInput<NzRateComponent>;
}
