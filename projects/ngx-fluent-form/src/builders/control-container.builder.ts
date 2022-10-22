import { SafeAny } from '@ngify/types';
import { AbstractSchema, AnyBuilder, AnySchema, AnySchemaName, FormArraySchema, FormGroupSchema, SchemaName } from '../schemas';
import { TypeAndName } from '../types';
import { standardSchema, standardSchemas } from '../utils';
import { builder, StableBuilder, UnstableBuilder } from '../utils/builder.utils';

type FormBuilderFn = (it: UnstableBuilder<FormGroupSchema, keyof AbstractSchema<AnySchemaName>>) => StableBuilder<FormGroupSchema>;

/** @internal */
function isFormBuilderFnTuple(arr: SafeAny[]): arr is [FormBuilderFn] {
  return arr[0] instanceof Function;
}

export function form(fn: FormBuilderFn): FormGroupSchema;
export function form(...schemas: (AnySchema | AnyBuilder)[]): AnySchema[];
export function form(...fnOrSchemas: (AnySchema | AnyBuilder)[] | [FormBuilderFn]): AnySchema[] | FormGroupSchema {
  if (isFormBuilderFnTuple(fnOrSchemas)) {
    const [fn] = fnOrSchemas;
    const builder = group() as UnstableBuilder<FormGroupSchema<number>, keyof AbstractSchema<AnySchemaName>>;
    const schema = fn(builder);
    return standardSchema(schema);
  }

  return standardSchemas(fnOrSchemas);
}

export function group(): UnstableBuilder<FormGroupSchema<number>, TypeAndName>;
export function group<N extends SchemaName>(name?: N): UnstableBuilder<FormGroupSchema<N>, TypeAndName>;
export function group<N extends SchemaName>(name?: N) {
  return builder<FormGroupSchema<N>>().type('group').name(name);
}

export function array(): UnstableBuilder<FormArraySchema<number>, TypeAndName>;
export function array<N extends SchemaName>(name?: N): UnstableBuilder<FormArraySchema<N>, TypeAndName>;
export function array<N extends SchemaName>(name?: N) {
  return builder<FormArraySchema<N>>().type('array').name(name);
}