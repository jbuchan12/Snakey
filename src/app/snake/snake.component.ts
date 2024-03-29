import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ICoordinate } from 'src/Interfaces/ICoordinate';
import { IPlayAreaBoundaries } from 'src/Interfaces/IPlayAreaBoundaries';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css'],
  host: {
    '(document:keydown)': 'onKeyDownEvent($event)'
  }
})

/**
 * Functionality for the snake that the player controls
 */
export class SnakeComponent {

  @ViewChild('snake') _SnakeElementRef: ElementRef | undefined;
  @Input() playBoundaries : IPlayAreaBoundaries = {
    leftBoundary : 0,
    rightBoundary : 0,
    topBoundary : 0,
    bottomBoundary : 0
  }

  @Input() foodCoordinate : ICoordinate = {
    x : 0,
    y : 0
  }

  private _MovementSpeed : number = 10;

  /**
   * Listens for user keydown presses of the WASD keys
   * @param event Js keydown event that called this method
   */
  private onKeyDownEvent(event : KeyboardEvent) : void{
    if(event.key == 'w' || event.key == 'a' || event.key == 's' || event.key == 'd'){
      this.move(event.key);
    }
  }

  /**
   * Gets access to the real snake element
   * @returns The real snake element
   */
  private getRealSnakeElement() : HTMLDivElement {

    if(this._SnakeElementRef?.nativeElement == undefined)
      throw new Error("Snake native element is undefined");

    return this._SnakeElementRef?.nativeElement as HTMLDivElement;  
  }

  /**
   * Moves the snake around the play area
   * @param key Which key was pressed on the keyboard
   */
  private move(key : string) : void{

    const snakeDivElement = this.getRealSnakeElement();

    switch(key){
      case 'd':
        this.moveRight(snakeDivElement);
        break;
      case 'a':
        this.moveLeft(snakeDivElement);
        break;
      case 'w':
        this.moveUp(snakeDivElement);
        break;
      case 's':
        this.moveDown(snakeDivElement);
        break;
      default:
        return;
    }

    if(this.hasSnakedHitBoundary())
      window.alert("Game Over");
  }

  /**
   * Moves the snake to the right
   * @param snake The actual htmlDivElement which represents the snake to the player
   */
  private moveRight(snake :HTMLDivElement):void{
    snake.style.marginLeft = this.calculateMovement(snake.style.marginLeft, true);
  }

  /**
   * Moves the snake to the left
   * @param snake The actual htmlDivElement which represents the snake to the player
   */
  private moveLeft(snake :HTMLDivElement):void{
    snake.style.marginLeft = this.calculateMovement(snake.style.marginLeft, false);
  }

  /**
   * Moves the snake down
   * @param snake The actual htmlDivElement which represents the snake to the player
   */
  private moveDown(snake :HTMLDivElement):void{
    snake.style.marginTop = this.calculateMovement(snake.style.marginTop, true);
  }

  /**
   * Moves the snake up
  * @param snake The actual htmlDivElement which represents the snake to the player 
   */
  private moveUp(snake :HTMLDivElement):void{
    snake.style.marginTop = this.calculateMovement(snake.style.marginTop, false);
  }

  /**
   * Calculates the new position of the snake after movement
   * @param currentPos The current position of the snake atm in a given axis
   * @param isPositiveMovement Are we moving across the axis in a positive direction
   * @returns 
   */
  private calculateMovement(currentPos : string, isPositiveMovement : boolean): string{

    if(currentPos === '')
      return `${this._MovementSpeed}px`

    let currentPosNumber = Number.parseInt(currentPos);

    return isPositiveMovement 
      ? `${currentPosNumber += this._MovementSpeed}px`
      : `${currentPosNumber -= this._MovementSpeed}px`
  }

    /**
   * Checks to see if the snake has hit any of the boundaries
   * @returns Has the snake hit the boundary
   */
    private hasSnakedHitBoundary() : boolean{

      const snakeDivElement = this.getRealSnakeElement();
  
      if(snakeDivElement.offsetLeft <= this.playBoundaries.leftBoundary)
        return true;
  
      if((snakeDivElement.clientWidth + snakeDivElement.offsetLeft) - this.playBoundaries.leftBoundary >= this.playBoundaries.rightBoundary)
        return true
  
      if(snakeDivElement.offsetTop <= this.playBoundaries.topBoundary)
        return true
  
      if((snakeDivElement.clientHeight + snakeDivElement.offsetTop) - this.playBoundaries.topBoundary >= this.playBoundaries.bottomBoundary)
        return true;
  
      return false;
    }
}
