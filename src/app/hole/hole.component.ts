import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hole',
  templateUrl: './hole.component.html',
  styleUrls: ['./hole.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class HoleComponent {
  @Input() par: number = 0;
  @Input() holeNumber: number = 0;
  @Input() players: { name: string, scores: number[] }[] = [];
  @Input() holeIndex: number = 0;

  constructor() { }

  getPlayerScore(playerIndex: number): number {
    return this.players[playerIndex].scores[this.holeIndex];
  }

  incrementScore(playerIndex: number) {
    this.players[playerIndex].scores[this.holeIndex]++;
  }

  decrementScore(playerIndex: number) {
    if (this.players[playerIndex].scores[this.holeIndex] > 0) {
      this.players[playerIndex].scores[this.holeIndex]--;
    }
  }
}
