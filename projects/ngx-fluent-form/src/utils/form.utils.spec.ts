import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { AnySchema } from '../schemas';
import { FormUtil } from './form.utils';

describe('form.utils', () => {
  let util: FormUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    util = TestBed.inject(FormUtil);
  });

  describe('FormUtil', () => {
    describe('createFormControl', () => {
      it('normal', () => {
        const control = util.createFormControl({ kind: 'input' }, {});
        expect(control).toBeTruthy();
      });

      describe('with double key control', () => {
        it('normal', () => {
          const form = util.createFormControl({ kind: 'slider', key: ['start', 'end'] }, {});

          expect(form.value).toEqual(null);
        });

        it('with model default value', () => {
          const form = util.createFormControl(
            { kind: 'slider', key: ['start', 'end'] },
            { start: 1, end: 100 }
          );

          expect(form.value).toEqual([1, 100]);
        });
      });

      it('with mapper', () => {
        const control = util.createFormControl({
          kind: 'input',
          key: 'input',
          mapper: {
            parser: (value: number) => value?.toString(),
            formatter: (value: string | null) => value?.toString()
          }
        }, { input: 1 });
        expect(control.value).toEqual('1');
      });

      it('with validators', () => {
        const control = util.createFormControl({
          kind: 'input',
          validators: [Validators.email]
        }, {});
        expect(control.hasValidator(Validators.email)).toBeTrue();
      });
    });

    describe('createFormGroup', () => {
      it('normal', () => {
        const form = util.createFormGroup({
          kind: 'group',
          schemas: [
            { kind: 'input', key: 'input' }
          ]
        }, {});

        expect(form.value).toEqual({ input: null });
      });

      it('with control default value', () => {
        const form = util.createFormGroup([
          { kind: 'input', key: 'input', defaultValue: 'control default value' }
        ], {});

        expect(form.value).toEqual({ input: 'control default value' });
      });

      it('with model default value', () => {
        const form = util.createFormGroup([
          { kind: 'input', key: 'input', defaultValue: 'control default value' }
        ], { input: 'model value' });

        expect(form.value).toEqual({ input: 'model value' });
      });

      describe('with double key control', () => {
        it('normal', () => {
          const form = util.createFormGroup([
            { kind: 'slider', key: ['start', 'end'] }
          ], {});

          expect(form.value).toEqual({ 'start,end': null });
        });

        it('with model default value', () => {
          const form = util.createFormGroup([
            { kind: 'slider', key: ['start', 'end'] }
          ], { start: 1, end: 100 });

          expect(form.value).toEqual({ 'start,end': [1, 100] });
        });
      });

      it('nested group', () => {
        const form = util.createFormGroup([
          { kind: 'input', key: 'input' },
          {
            kind: 'group',
            key: 'group',
            schemas: [
              { kind: 'input', key: 'input' }
            ]
          }
        ], {});

        expect(form.value).toEqual({
          input: null,
          group: {
            input: null
          }
        });
      });

      it('nested array', () => {
        const form = util.createFormGroup([
          { kind: 'input', key: 'input' },
          {
            kind: 'array',
            key: 'array',
            schemas: [
              { kind: 'input' }
            ]
          }
        ], {});

        expect(form.value).toEqual({
          input: null,
          array: []
        });
      });

      it('with control wrapper', () => {
        const form = util.createFormGroup([
          {
            kind: 'input-group',
            schemas: [
              { kind: 'input', key: 'input' }
            ]
          }
        ], {});

        expect(form.value).toEqual({ input: null });
      });

      it('with component', () => {
        const form = util.createFormGroup([
          { kind: 'input', key: 'input' },
          { kind: 'button' }
        ], {});

        expect(form.value).toEqual({ input: null });
      });

      it('with component wrapper', () => {
        const form = util.createFormGroup([
          { kind: 'input', key: 'input' },
          {
            kind: 'button-group',
            schemas: [
              { kind: 'button' }
            ]
          }
        ], {});

        expect(form.value).toEqual({ input: null });
      });

      it('with component container', () => {
        const form = util.createFormGroup([
          {
            kind: 'row',
            schemas: [
              { kind: 'input', key: 'input' },
            ]
          }
        ], {});

        expect(form.value).toEqual({ input: null });
      });
    });

    describe('createFormArray', () => {
      it('normal', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'input' }
          ]
        }, []);

        expect(form.value).toEqual([]);
      });

      it('not element schema', () => {
        expect(() => {
          util.createFormArray({
            kind: 'array',
            schemas: []
          }, []);
        }).toThrowError('FormArray element control schema not found');
      });

      it('with model value', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'input' }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with control wrapper', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'input-group',
              schemas: [
                { kind: 'input' }
              ]
            }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with component', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'input' },
            { kind: 'button' }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with component wrapper', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'input' },
            {
              kind: 'button-group',
              schemas: [
                { kind: 'button' }
              ]
            }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with component container', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'row',
              schemas: [
                { kind: 'input' }
              ]
            }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('nested group', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'group',
              schemas: [
                { kind: 'input', key: 'input' }
              ]
            }
          ]
        }, [{ input: 'input' }]);

        expect(form.value).toEqual([{ input: 'input' }]);
      });

      it('nested array', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'array',
              schemas: [
                { kind: 'input' }
              ]
            }
          ]
        }, [['hello', 'world']]);

        expect(form.value).toEqual([['hello', 'world']]);
      });
    });

    describe('createAnyControl', () => {
      it('normal', () => {
        const schema: AnySchema = { kind: 'input', key: 'input' };
        const control = util.createAnyControl(schema, {});
        expect(control.value).toEqual(null);
      });

      it('group', () => {
        const schema: AnySchema = {
          kind: 'group',
          key: 'group',
          schemas: [
            { kind: 'input', key: 'input' }
          ]
        };
        const control = util.createAnyControl(schema, {});
        expect(control.value).toEqual({ input: null });
      });

      it('array', () => {
        const schema: AnySchema = {
          kind: 'array',
          key: 'array',
          schemas: [
            { kind: 'input' }
          ]
        };
        const control = util.createAnyControl(schema, {});
        expect(control.value).toEqual([]);
      });
    });

    describe('updateModel', () => {
      it('with control', () => {
        const schemas: AnySchema[] = [
          { kind: 'number', key: 'num', defaultValue: 1 }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({ num: 1 });
      });

      describe('with double key control', () => {
        it('normal', () => {
          const schemas: AnySchema[] = [
            { kind: 'slider', key: ['start', 'end'] }
          ];
          const form = util.createFormGroup(schemas, {});

          expect(util.updateModel({}, form, schemas)).toEqual({ start: null, end: null });
        });

        it('with default value', () => {
          const schemas: AnySchema[] = [
            { kind: 'slider', key: ['start', 'end'], defaultValue: [0, 100] }
          ];
          const form = util.createFormGroup(schemas, {});

          expect(util.updateModel({}, form, schemas)).toEqual({ start: 0, end: 100 });
        });
      });

      it('with component', () => {
        const schemas: AnySchema[] = [
          { kind: 'button' }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({});
      });

      it('with component wrapper', () => {
        const schemas: AnySchema[] = [
          { kind: 'button-group', schemas: [] }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({});
      });

      it('with group', () => {
        const schemas: AnySchema[] = [
          {
            kind: 'group',
            key: 'obj',
            schemas: [
              { kind: 'number', key: 'num', defaultValue: 1 }
            ]
          }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({ obj: { num: 1 } });
      });

      it('with array', () => {
        const schemas: AnySchema[] = [
          {
            kind: 'array',
            key: 'array',
            schemas: [
              { kind: 'number' }
            ]
          }
        ];
        const form = util.createFormGroup(schemas, { array: [1, 2] });

        expect(util.updateModel({}, form, schemas)).toEqual({ array: [1, 2] });
      });
    });

    describe('updateForm', () => {
      describe('disbaled', () => {
        it('normal', () => {
          const schemas: AnySchema[] = [
            { kind: 'toggle', key: 'bool', disabled: ({ model }) => model.bool },
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { bool: true }, schemas);
          expect(form.get('bool')!.disabled).toBeTrue();

          util.updateForm(form, { bool: false }, schemas);
          expect(form.get('bool')!.enabled).toBeTrue();
        });

        it('with component', () => {
          const schemas: AnySchema[] = [
            { kind: 'button' },
            { kind: 'toggle', key: 'bool', disabled: ({ model }) => model.bool },
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { bool: true }, schemas);
          expect(form.get('bool')!.disabled).toBeTrue();
        });

        it('with group', () => {
          const schemas: AnySchema[] = [
            {
              kind: 'group',
              key: 'obj',
              schemas: [
                { kind: 'toggle', key: 'bool', disabled: ({ model }) => model.bool },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { obj: { bool: true } }, schemas);
          expect(form.get('obj.bool')!.disabled).toBeTrue();
        });

        it('with array', () => {
          const schemas: AnySchema[] = [
            {
              kind: 'array',
              key: 'arr',
              schemas: [
                { kind: 'toggle', key: 0, disabled: ({ model }) => model[0] },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, { arr: [true] });

          util.updateForm(form, { arr: [true] }, schemas);
          expect(form.get(['arr', 0])!.disabled).toBeTrue();
        });
      });

      describe('required', () => {
        it('normal', () => {
          const schemas: AnySchema[] = [
            { kind: 'toggle', key: 'bool', required: ({ model }) => model.bool },
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { bool: true }, schemas);
          expect(form.get('bool')!.hasValidator(Validators.required)).toBeTrue();
          util.updateForm(form, { bool: false }, schemas);
          expect(form.get('bool')!.hasValidator(Validators.required)).toBeFalse();
        });

        it('with component', () => {
          const schemas: AnySchema[] = [
            { kind: 'button' },
            { kind: 'toggle', key: 'bool', required: ({ model }) => model.bool },
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { bool: true }, schemas);
          expect(form.get('bool')!.hasValidator(Validators.required)).toBeTrue();
        });

        it('with group', () => {
          const schemas: AnySchema[] = [
            {
              kind: 'group',
              key: 'obj',
              schemas: [
                { kind: 'toggle', key: 'bool', required: ({ model }) => model.bool },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { obj: { bool: true } }, schemas);
          expect(form.get('obj.bool')!.hasValidator(Validators.required)).toBeTrue();
        });

        it('with array', () => {
          const schemas: AnySchema[] = [
            {
              kind: 'array',
              key: 'arr',
              schemas: [
                { kind: 'toggle', key: 0, required: ({ model }) => model[0] },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, { arr: [true] });

          util.updateForm(form, { arr: [true] }, schemas);
          expect(form.get(['arr', 0])!.hasValidator(Validators.required)).toBeTrue();
        });
      });
    });
  });
});
