import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { Subject, takeUntil } from 'rxjs';
import { FluentSchema } from './models/fluent-form.model';
import { assignFormToModel, assignModelToForm } from './utils/form.utils';
import { convertSchemasToGroup } from './utils/schema.utils';

@Component({
  selector: 'fluent-form',
  templateUrl: './fluent-form.component.html',
  styleUrls: ['./fluent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormComponent<T extends Record<string, unknown>> implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  private _fluent!: FluentSchema;
  private _model!: T;

  readonly infinity: number = Infinity;

  @Input()
  get model(): T { return this._model; }
  set model(value: T) {
    this._model = value;
    this.fluent && assignModelToForm(value, this.form, this.fluent.schemas);
  }

  @Input()
  get fluent() { return this._fluent; }
  set fluent(value: FluentSchema) {
    this._fluent = value;
    this.form = convertSchemasToGroup(this.fluent.schemas);
  }

  /** Form layout */
  @Input() layout: NzFormLayoutType = 'vertical';
  /** Whether or not to display the colon after the label */
  @Input() noColon: boolean = false;
  @Input() addOnBefore: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() addOnAfter: TemplateRef<{ form: FormGroup }> | null = null;
  @Input() spinning?: boolean;
  @Input() spinTip: string = 'Loading...';
  @Input() spinSize: NzSizeLDSType = 'large';

  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    assignModelToForm(this.model, this.form, this.fluent.schemas);

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      assignFormToModel(this.form, this.model, this.fluent.schemas);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  log(o: any) { console.log('LOG', o) }

}
