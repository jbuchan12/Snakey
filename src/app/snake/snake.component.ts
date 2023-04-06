import { Component, ElementRef, ViewChild } from '@angular/core';

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
   * Moves the snake around the play area
   * @param key Which key was pressed on the keyboard
   */
  private move(key : string) : void{

    if(this._SnakeElementRef?.nativeElement == undefined)
      return;

    const snakeDivElement = this._SnakeElementRef.nativeElement as HTMLDivElement;

    switch(key){
      case 'd':
        this.moveRight(snakeDivElement);
        return;
      case 'a':
        this.moveLeft(snakeDivElement);
        return;
      case 'w':
        this.moveUp(snakeDivElement);
        return;
      case 's':
        this.moveDown(snakeDivElement);
        return;
      default:
        return;
    }
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
}
