import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPlayAreaBoundaries } from 'src/Interfaces/IPlayAreaBoundaries';
import { FoodComponent } from './food/food.component';
import { ICoordinate } from 'src/Interfaces/ICoordinate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/**
 * Class that represents the application
 */
export class AppComponent implements AfterViewChecked {   
  title = 'Snakey';
  @ViewChild('playArea') _PlayAreaRef: ElementRef | undefined;
  @ViewChild(FoodComponent) foodComponent: FoodComponent | undefined;

  playAreaBoundaries : IPlayAreaBoundaries = {
    leftBoundary : 0,
    rightBoundary : 0,
    topBoundary : 0,
    bottomBoundary : 0
  }

  foodCoordinate : ICoordinate = {
    x : 0,
    y : 0
  }

  /**
   * The after view checked angular event call
   */
  ngAfterViewChecked(): void {
    this.setPlayAreaBoundaries();
    this.setFoodPosition();
  }

  /**
   * Set the position of the snake food in the game
   */
  private setFoodPosition() : void{
    if(this.foodComponent?._FoodElementRef == undefined)
      return;

    this.foodCoordinate = this.foodComponent.getPosition();
  }

  /**
   * Set the boundaries of the play area
   */
  private setPlayAreaBoundaries() : void {
    if(this._PlayAreaRef?.nativeElement == undefined || 
      this.playAreaBoundaries.leftBoundary !== 0)
     return;

    const realPlayArea = this._PlayAreaRef.nativeElement as HTMLDivElement;

    this.playAreaBoundaries = {
      topBoundary : realPlayArea.clientTop,
      leftBoundary : realPlayArea.clientLeft,
      rightBoundary : realPlayArea.clientWidth,
      bottomBoundary : realPlayArea.clientHeight
    };
  }
}
