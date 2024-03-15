import { Component } from '@angular/core';
import { HoleComponent } from '../hole/hole.component';
import { CommonModule } from '@angular/common';
import {}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  imports: [HoleComponent, CommonModule],
  standalone: true
})
export class CourseComponent {
  holes = [
    { holeNumber: 1, par: 4 },
    { holeNumber: 2, par: 3 },
    { holeNumber: 3, par: 5 },
    // Add more holes as needed
  ];

  players: { name: string, scores: number[] }[] = [];
  selectedHoleIndex: number | null = null;

  constructor() { }

  ngOnInit() {
  }

  addPlayer(playerName: string) {
    this.players.push({ name: playerName, scores: new Array(this.holes.length).fill(0) });
  }

  updatePlayerScore(playerIndex: number, score: number, holeIndex: number) {
    this.players[playerIndex].scores[holeIndex] = score;
  }

  getTotalScoreForPlayer(playerIndex: number): number {
    return this.players[playerIndex].scores.reduce((acc, curr) => acc + curr, 0);
  }

  selectHole(holeIndex: number) {
    this.selectedHoleIndex = holeIndex;
  }
}
