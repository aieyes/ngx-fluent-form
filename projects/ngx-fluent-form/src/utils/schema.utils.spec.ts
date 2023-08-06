import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { array, group, input, inputGroup, slider, textarea } from '../builders';
import { useButtonWidget, withAllWidgets, withSchemaPatchers, withWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { AnySchema, ButtonComponentSchema, HeadingComponentSchema, InputControlSchema, NumberInputControlSchema, StandardSchema } from '../schemas';
import { SchemaType } from '../schemas/interfaces';
import { schemasUtils, SchemaUtil, standardSchema, standardSchemas } from './schema.utils';

describe('SchemaUtil', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  describe('SchemaUtil', () => {
    describe('patchSchema', () => {
      describe('with internal patcher', () => {
        it('heading patcher', () => {
          const schema: HeadingComponentSchema = { kind: 'heading', level: 1, content: '' };
          expect(schemaUtil.patchSchema(schema)).toEqual({ kind: 'heading', level: 1, content: '', col: 24 });
        });
      });
    });

    it('isAnySchema', () => {
      expect(schemaUtil.isComponentContainerSchema({ kind: 'tab' })).toBeTrue();
      expect(schemaUtil.isComponentSchema({ kind: 'text' })).toBeTrue();
      expect(schemaUtil.isComponentWrapperSchema({ kind: 'button-group' })).toBeTrue();
      expect(schemaUtil.isControlContainerSchema({ kind: 'group' })).toBeTrue();
      expect(schemaUtil.isControlWrapperSchema({ kind: 'input-group' })).toBeTrue();
      expect(schemaUtil.isControlSchema({ kind: 'input' })).toBeTrue();
      expect(schemaUtil.isNonControlSchema({ kind: 'button' })).toBeTrue();
    });

    it('filterControlSchemas', () => {
      expect(schemaUtil.filterControlSchemas([
        { kind: 'text', content: '' },
        { kind: 'button-group', schemas: [] },
        { kind: 'input' },
        { kind: 'group', schemas: [] },
        { kind: 'array', schemas: [] },
        {
          kind: 'input-group',
          schemas: [
            { kind: 'input' }
          ]
        },
        {
          kind: 'row',
          schemas: [
            { kind: 'input' }
          ]
        }
      ])).toEqual([
        { kind: 'input' },
        { kind: 'group', schemas: [] },
        { kind: 'array', schemas: [] },
        { kind: 'input' },
        { kind: 'input' },
      ]);
    });

    describe('带验证器的图示', () => {
      it('length', () => {
        const schema: StandardSchema<AnySchema> = { kind: 'input', length: 1 };
        const validators = schemaUtil.validatorsOf(schema);
        // min & max
        expect(validators.length).toBe(2);
      });

      it('min/max', () => {
        const schema = standardSchema(textarea('name').length({ min: 1, max: 2 }));
        const validators = schemaUtil.validatorsOf(schema);

        expect(validators.length).toBe(2);
      });

      it('required', () => {
        const schema = standardSchema(input('name').required(true));
        const validators = schemaUtil.validatorsOf(schema);

        expect(validators).toEqual([Validators.required]);
      });

      it('email', () => {
        const schema = standardSchema(input('name').type('email').required(true));
        const validators = schemaUtil.validatorsOf(schema);

        expect(validators.length).toBe(2);
        expect(validators).toContain(Validators.email);
        expect(validators).toContain(Validators.required);
      });
    });
  });

  describe('应该能正确标准化图示', () => {
    it('普通图示', () => {
      const schemas = standardSchemas([input('name')]);
      expect(schemas).toEqual([{ kind: 'input', key: 'name' }]);
    });

    describe('嵌套图示', () => {
      it('group', () => {
        const schemas = standardSchemas([
          group('name').schemas(
            input('name')
          )
        ]);

        expect(schemas).toEqual([{
          kind: 'group',
          key: 'name',
          schemas: [
            { kind: 'input', key: 'name' }
          ]
        }]);
      });

      it('array', () => {
        const schemas = standardSchemas([
          array('name').schemas(
            group().schemas(
              input('name')
            )
          )
        ]);

        expect(schemas).toEqual([{
          kind: 'array',
          key: 'name',
          schemas: [{
            kind: 'group',
            key: 0,
            schemas: [
              { kind: 'input', key: 'name' }
            ]
          }]
        }]);
      });

      it('input-group', () => {
        const schemas = standardSchemas([
          inputGroup().schemas(
            input('name')
          )
        ]);

        expect(schemas).toEqual([{
          kind: 'input-group',
          schemas: [
            { kind: 'input', key: 'name' }
          ]
        }]);
      });
    });
  });

  describe('应该能在图示列表中找到目标图示', () => {
    it('普通图示', () => {
      const target = standardSchema(input('name'));
      const schemas = [target];
      schemasUtils(schemas).find('name');
      const schema = schemasUtils(schemas).find('name');

      expect(schema).toEqual(target);
    });

    it('二级图示', () => {
      const target = standardSchema(input('name'));
      const schemas = standardSchemas([
        group('group').schemas(target)
      ]);
      const schema = schemasUtils(schemas).find(['group', 'name']);

      expect(schema).toEqual(target);
    });

    it('多级图示', () => {
      const target = standardSchema(input('name'));
      const schemas = standardSchemas([
        group('group').schemas(
          group('group').schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['group', 'group', 'name']);

      expect(schema).toEqual(target);
    });

    it('一维数组图示', () => {
      const target = standardSchema(input(0));
      const schemas = standardSchemas([
        array('array').schemas(target)
      ]);
      const schema = schemasUtils(schemas).find(['array', 0]);

      expect(schema).toEqual(target);
    });

    it('多维数组图示', () => {
      const target = standardSchema(input(0));
      const schemas = standardSchemas([
        array('array').schemas(
          array().schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['array', 0, 0]);

      expect(schema).toEqual(target);
    });

    it('对象嵌套数组图示', () => {
      const target = standardSchema(input(0));
      const schemas = standardSchemas([
        group('group').schemas(
          array('array').schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['group', 'array', 0]);

      expect(schema).toEqual(target);
    });

    it('数组嵌套对象图示', () => {
      const target = standardSchema(input('name'));
      const schemas = standardSchemas([
        array('array').schemas(
          group(0).schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['array', 0, 'name']);

      expect(schema).toEqual(target);
    });

    it('双字段图示', () => {
      const names = ['begin', 'end'] as const;
      const target = standardSchema(slider(names));
      const schemas = [target];

      expect(schemasUtils(schemas).find([names])).toEqual(target);
      expect(schemasUtils(schemas).find([['begin', 'end']])).toEqual(target);
    });

    it('不存在的图示', () => {
      const schemas = standardSchemas([input('name')]);
      const schema = schemasUtils(schemas).find('n');

      expect(schema).toBe(null);
    });

    it('不存在的双字段图示', () => {
      const schemas = standardSchemas([slider(['begin', 'end'])]);
      const schema = schemasUtils(schemas).find([['begin', 'e']]);

      expect(schema).toBe(null);
    });
  });
});

describe('SchemaUtil with patcher feature', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets(),
          withSchemaPatchers(
            {
              selector: '*',
              patch: schema => {
                schema.class = new Set<string>();
                return schema;
              }
            },
            {
              selector: 'input',
              patch: schema => {
                (schema.class as Set<string>).add('kind-selector');
                return schema;
              }
            },
            {
              selector: ['input', 'number'],
              patch: schema => {
                (schema.class as Set<string>).add('kind-array-selector');
                return schema;
              }
            },
            {
              selector: SchemaType.Control | SchemaType.ControlContainer,
              patch: schema => {
                (schema.class as Set<string>).add('schema-type-selector');
                return schema;
              }
            },
            {
              selector: {
                control: true,
                controlContainer: true,
                componentWrapper: true,
                component: true,
                componentContainer: true,
                controlWrapper: true
              },
              patch: schema => {
                (schema.class as Set<string>).add('options-selector');
                return schema;
              }
            },
          )
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  it('with * selector', () => {
    const schema: InputControlSchema = { kind: 'input' };
    expect(schemaUtil.patchSchema(schema).class).toBeInstanceOf(Set);
  });

  it('with kind selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const otherSchema: NumberInputControlSchema = { kind: 'number' };
    expect(schemaUtil.patchSchema(inputSchema).class).toContain('kind-selector');
    expect(schemaUtil.patchSchema(otherSchema).class).not.toContain('kind-selector');
  });

  it('with kind-array selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const numberSchema: NumberInputControlSchema = { kind: 'number' };
    expect(schemaUtil.patchSchema(inputSchema).class).toContain('kind-array-selector');
    expect(schemaUtil.patchSchema(numberSchema).class).toContain('kind-array-selector');
  });

  it('with schema-kind selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const buttonSchema: ButtonComponentSchema = { kind: 'button' };
    expect(schemaUtil.patchSchema(inputSchema).class).toContain('schema-type-selector');
    expect(schemaUtil.patchSchema(buttonSchema).class).not.toContain('schema-type-selector');
  });

  it('with options selector', () => {
    const schema: InputControlSchema = { kind: 'input' };
    expect(schemaUtil.patchSchema(schema).class).toContain('options-selector');
  });

  it('with multi patchers', () => {
    const schema: InputControlSchema = { kind: 'input' };
    expect(schemaUtil.patchSchema(schema).class).toBeInstanceOf(Set);
    expect(schemaUtil.patchSchema(schema).class).toContain('kind-selector');
    expect(schemaUtil.patchSchema(schema).class).toContain('kind-array-selector');
    expect(schemaUtil.patchSchema(schema).class).toContain('kind-array-selector');
    expect(schemaUtil.patchSchema(schema).class).toContain('schema-type-selector');
    expect(schemaUtil.patchSchema(schema).class).toContain('options-selector');
  });
});

describe('SchemaUtil with no patcher feature', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withWidgets(
            useButtonWidget()
          )
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  it('no patcher', () => {
    const schema: ButtonComponentSchema = { kind: 'button' };
    expect(schemaUtil.patchSchema(schema)).toEqual({ kind: 'button' });
  });
});
