import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'round'})
export class RoundPipe implements PipeTransform {
    transform(value: number): any {
        return Math.round(value);
    }
}