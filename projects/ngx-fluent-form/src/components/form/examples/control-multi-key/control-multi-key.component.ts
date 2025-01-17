import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { dateRange, FluentFormComponent, form } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './control-multi-key.component.html'
})
export class ControlMultiKeyExampleComponent {
  schema = form(() => {
    dateRange(['start', 'end']).label('日期区间');
  });

  model = {};
}
