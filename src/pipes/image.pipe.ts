import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'WeatherImage'})
export class WeatherImagePipe implements PipeTransform {
    transform(icon: string): any {
        if (icon) {
            return 'assets/img/' + icon + '.png';
          } else {
            return 'assets/img/default.png';
          }
    }
}