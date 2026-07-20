import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userIdGenerator',
})
export class UserIdGeneratorPipe implements PipeTransform {
  transform(value: number | string | null | undefined | '', role: string): unknown {
    if (value == 0 || value == '' || value == null || value == undefined) {
      return value;
    }
    else {
      if (role != '' && role != null && role != undefined) {
        return (role.toUpperCase().toString().trim() + value?.toString().padStart(4, '0'));
      }
      else {
        return ('I' + value?.toString().padStart(4, '0'));
      }
    }
  }
}
