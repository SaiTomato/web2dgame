import { Component, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { startGame, stopGame } from '@/game/main';
import { SocketService } from '@/app/services/socket.service';
import { bindSocketEvents } from '@/app/services/socket-events';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements AfterViewInit, OnDestroy {
  
  constructor(private socket: SocketService) {}

  @ViewChild('gameContainer', { static: true })
  gameContainer!: ElementRef<HTMLDivElement>;
  
  ngAfterViewInit() {
    this.socket.connect();
    bindSocketEvents(this.socket);
    startGame(this.gameContainer.nativeElement);
  }

  ngOnDestroy() {
    this.socket.disconnect();
    stopGame();
  }
}