import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValue'
})
export class KeyValuePipe implements PipeTransform {
  transform(value: Record<string, number>): { key: string; value: number }[] {
    return Object.entries(value).map(([key, value]) => ({ key, value }));
  }
}
