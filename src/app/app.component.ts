import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IPlayAreaBoundaries } from 'src/Interfaces/IPlayAreaBoundaries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * Class that represents the application
 */
export class AppComponent implements AfterViewChecked {   
  title = 'Snakey';
  @ViewChild('playArea') _PlayAreaRef: ElementRef | undefined;

  playAreaBoundaries : IPlayAreaBoundaries = {
    leftBoundary : 0,
    rightBoundary : 0,
    topBoundary : 0,
    bottomBoundary : 0
  }

  ngAfterViewChecked(): void {
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
