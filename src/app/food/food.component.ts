import { Component, ViewChild, ElementRef } from '@angular/core';
import { ICoordinate } from 'src/Interfaces/ICoordinate';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {

  @ViewChild('food') _FoodElementRef : ElementRef | undefined;

  getPosition() : ICoordinate {
    if(this._FoodElementRef?.nativeElement === undefined)
      return {
        x : 0,
        y : 0
      }

    const realFoodElement = this._FoodElementRef.nativeElement as HTMLDivElement;

    return {
      x : realFoodElement.offsetLeft,
      y : realFoodElement.offsetHeight
    };
  }

}
