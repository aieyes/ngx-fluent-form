import { AnyControlSchema, CascaderControlSchema, CheckboxControlSchema, CheckboxGroupControlSchema, DatePickerControlSchema, DateRangePickerControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { AnySchemaName, SchemaName } from '../schemas/types';
import { Builder, builder, UnstableBuilder } from '../utils';
import { KindAndName } from './helper';

const REST_PARAMS = ['validators', 'asyncValidators'] as const;

function controlBuilder<T extends AnyControlSchema>(): Builder<T, RestSchema> {
  return builder<T, RestSchema>(REST_PARAMS);
}

export function input(): UnstableControlBuilder<InputControlSchema<number>, KindAndName>;
export function input<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindAndName>;
export function input<N extends SchemaName>(name?: N) {
  return controlBuilder<InputControlSchema<N>>().kind('input').name(name);
}

export function string(): UnstableControlBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function string<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function string<N extends SchemaName>(name?: N) {
  return input(name).type('text');
}

export function email(): UnstableControlBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function email<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function email<N extends SchemaName>(name?: N) {
  return input(name).type('email');
}

export function telephone(): UnstableControlBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function telephone<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function telephone<N extends SchemaName>(name?: N) {
  return input(name).type('tel');
}

export function url(): UnstableControlBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function url<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function url<N extends SchemaName>(name?: N) {
  return input(name).type('url');
}

export function password(): UnstableControlBuilder<InputControlSchema<number>, KindAndNameAndType>;
export function password<N extends SchemaName>(name?: N): UnstableControlBuilder<InputControlSchema<N>, KindAndNameAndType>;
export function password<N extends SchemaName>(name?: N) {
  return input(name).type('password');
}

export function textarea(): UnstableControlBuilder<TextareaControlSchema<number>, KindAndName>;
export function textarea<N extends SchemaName>(name?: N): UnstableControlBuilder<TextareaControlSchema<N>, KindAndName>;
export function textarea<N extends SchemaName>(name?: N) {
  return controlBuilder<TextareaControlSchema<N>>().kind('textarea').name(name);
}

export function number(): UnstableControlBuilder<NumberInputControlSchema<number>, KindAndName>;
export function number<N extends SchemaName>(name?: N): UnstableControlBuilder<NumberInputControlSchema<N>, KindAndName>;
export function number<N extends SchemaName>(name?: N) {
  return controlBuilder<NumberInputControlSchema<N>>().kind('number').name(name);
}

export function integer(): UnstableControlBuilder<NumberInputControlSchema<number>, KindAndName | 'precision'>;
export function integer<N extends SchemaName>(name?: N): UnstableControlBuilder<NumberInputControlSchema<N>, KindAndName | 'precision'>;
export function integer<N extends SchemaName>(name?: N) {
  return number(name).precision({ value: 0, mode: 'cut' });
}

export function date(): UnstableControlBuilder<DatePickerControlSchema<number>, KindAndName>;
export function date<N extends SchemaName>(name?: N): UnstableControlBuilder<DatePickerControlSchema<N>, KindAndName>;
export function date<N extends SchemaName>(name?: N) {
  return controlBuilder<DatePickerControlSchema<N>>().kind('date').name(name);
}

export function datetime(): UnstableControlBuilder<DatePickerControlSchema<number>, KindAndName | TimeAndFormat>;
export function datetime<N extends SchemaName>(name?: N): UnstableControlBuilder<DatePickerControlSchema<N>, KindAndName | TimeAndFormat>;
export function datetime<N extends SchemaName>(name?: N) {
  return date<N>(name).format('yyyy-MM-dd HH:mm:ss').time(true);
}

export function time(): UnstableControlBuilder<TimePickerControlSchema<number>, KindAndName>;
export function time<N extends SchemaName>(name?: N): UnstableControlBuilder<TimePickerControlSchema<N>, KindAndName>;
export function time<N extends SchemaName>(name?: N) {
  return controlBuilder<TimePickerControlSchema<N>>().kind('time').name(name);
}

export function toggle(): UnstableControlBuilder<ToggleControlSchema<number>, KindAndName>;
export function toggle<N extends SchemaName>(name?: N): UnstableControlBuilder<ToggleControlSchema<N>, KindAndName>;
export function toggle<N extends SchemaName>(name?: N) {
  return controlBuilder<ToggleControlSchema<N>>().kind('toggle').name(name);
}

export function select(): UnstableControlBuilder<SelectControlSchema<number>, KindAndName>;
export function select<N extends SchemaName>(name?: N): UnstableControlBuilder<SelectControlSchema<N>, KindAndName>;
export function select<N extends SchemaName>(name?: N) {
  return controlBuilder<SelectControlSchema<N>>().kind('select').name(name);
}

export function cascader(): UnstableControlBuilder<CascaderControlSchema<number>, KindAndName>;
export function cascader<N extends SchemaName>(name?: N): UnstableControlBuilder<CascaderControlSchema<N>, KindAndName>;
export function cascader<N extends SchemaName>(name?: N) {
  return controlBuilder<CascaderControlSchema<N>>().kind('cascader').name(name);
}

export function treeSelect(): UnstableControlBuilder<TreeSelectControlSchema<number>, KindAndName>;
export function treeSelect<N extends SchemaName>(name?: N): UnstableControlBuilder<TreeSelectControlSchema<N>, KindAndName>;
export function treeSelect<N extends SchemaName>(name?: N) {
  return controlBuilder<TreeSelectControlSchema<N>>().kind('tree-select').name(name);
}

export function radioGroup(): UnstableControlBuilder<RadioGroupControlSchema<number>, KindAndName>;
export function radioGroup<N extends SchemaName>(name?: N): UnstableControlBuilder<RadioGroupControlSchema<N>, KindAndName>;
export function radioGroup<N extends SchemaName>(name?: N) {
  return controlBuilder<RadioGroupControlSchema<N>>().kind('radio-group').name(name);
}

export function checkbox(): UnstableControlBuilder<CheckboxControlSchema<number>, KindAndName>;
export function checkbox<N extends SchemaName>(name?: N): UnstableControlBuilder<CheckboxControlSchema<N>, KindAndName>;
export function checkbox<N extends SchemaName>(name?: N) {
  return controlBuilder<CheckboxControlSchema<N>>().kind('checkbox').name(name);
}

export function checkboxGroup(): UnstableControlBuilder<CheckboxGroupControlSchema<number>, KindAndName>;
export function checkboxGroup<N extends SchemaName>(name?: N): UnstableControlBuilder<CheckboxGroupControlSchema<N>, KindAndName>;
export function checkboxGroup<N extends SchemaName>(name?: N) {
  return controlBuilder<CheckboxGroupControlSchema<N>>().kind('checkbox-group').name(name);
}

export function rate(): UnstableControlBuilder<RateControlSchema<number>, KindAndName>;
export function rate<N extends SchemaName>(name?: N): UnstableControlBuilder<RateControlSchema<N>, KindAndName>;
export function rate<N extends SchemaName>(name?: N) {
  return controlBuilder<RateControlSchema<N>>().kind('rate').name(name);
}

export function slider(): UnstableControlBuilder<SliderControlSchema<number>, KindAndName>;
export function slider<N extends AnySchemaName>(name?: N): UnstableControlBuilder<SliderControlSchema<N>, KindAndName>;
export function slider<N extends AnySchemaName>(name?: N) {
  return controlBuilder<SliderControlSchema<N>>().kind('slider').name(name);
}

export function dateRange(): UnstableControlBuilder<DateRangePickerControlSchema<number>, KindAndName>;
export function dateRange<N extends AnySchemaName>(name?: N): UnstableControlBuilder<DateRangePickerControlSchema<N>, KindAndName>;
export function dateRange<N extends AnySchemaName>(name?: N) {
  return controlBuilder<DateRangePickerControlSchema<N>>().kind('date-range').name(name);
}

type RestSchema = typeof REST_PARAMS[number];
type UnstableControlBuilder<T extends AnyControlSchema, S extends keyof T> = UnstableBuilder<T, S, RestSchema>
type KindAndNameAndType = KindAndName | 'type';
type TimeAndFormat = 'time' | 'format';
