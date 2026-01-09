import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { startGame, stopGame } from '@/game/main';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements AfterViewInit, OnDestroy {

  // ngOnInit() {
  //   startGame('game-container');
  // }

  @ViewChild('gameContainer', { static: true })
  gameContainer!: ElementRef<HTMLDivElement>;
  
  ngAfterViewInit() {
    startGame(this.gameContainer.nativeElement);
  }

  ngOnDestroy() {
    stopGame();
  }
}