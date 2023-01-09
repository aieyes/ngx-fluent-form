import { ButtonComponentSchema, SchemaName, TextComponentSchema } from '../schemas';
import { KindAndName } from '../types';
import { builder, UnstableBuilder } from '../utils';

export function text<N extends SchemaName>(name?: N): UnstableBuilder<TextComponentSchema<N>, KindAndName> {
  return builder<TextComponentSchema<N>>().kind('text').name(name);
}

export function button<N extends SchemaName>(name?: N): UnstableBuilder<ButtonComponentSchema<N>, KindAndName> {
  return builder<ButtonComponentSchema<N>>().kind('button').name(name);
}
