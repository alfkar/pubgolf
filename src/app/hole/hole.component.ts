import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hole',
  templateUrl: './hole.component.html',
  styleUrls: ['./hole.component.css']
})
export class HoleComponent {
  par: number = 1;
  players: { name: string, score: number }[] = [];

  constructor() { }
  ngOnInit(){
    this.addPlayer('John', 1);
    this.addPlayer('Jane', 2);
    this.addPlayer('Jack', 3);
  }
  addPlayer(playerName: string, playerScore: number) {
    this.players.push({ name: playerName, score: playerScore });
  }

  getPlayerScoreDifference(playerScore: number): number {
    return playerScore - this.par;
  }
}
