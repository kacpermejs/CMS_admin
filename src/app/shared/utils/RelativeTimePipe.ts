import { Pipe, PipeTransform } from '@angular/core';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { convertToRelativeTime } from './convertToRelativeTime';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(date: Timestamp | FieldValue): string {
    return convertToRelativeTime(date);
  }
}
