import { Component } from '@angular/core';
import { HoleComponent } from '../hole/hole.component';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  imports: [HoleComponent, CommonModule, NavbarComponent, FormsModule],
  standalone: true
})
export class CourseComponent {
  formId = "something";
  isLoggedIn: boolean = false;
  loggedInUser: User | undefined;
  holes: Hole[] = [];
  showHoleForm: boolean = false;
  showAddPlayerForm: boolean = false;
  players: Player[] = [];
  selectedHoleIndex: number | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to isLoggedIn changes
    this.userService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
    // Subscribe to loggedInUser changes
    this.userService.loggedInUser$.subscribe((loggedInUser: User | undefined) => {
      this.loggedInUser = loggedInUser;
    });
    this.holes.push({holeNumber: this.holes.length + 1, par: 1, playerScores: new Map<string, number>()})
    this.selectedHoleIndex = this.holes.length - 1;
  }

  addPlayer(playerName: string) {
    this.players.push({ id: '', name: playerName, scores: new Array(this.holes.length).fill(0) });
  }
  toggleHoleForm(){
    this.showHoleForm = !this.showHoleForm;
  }
  toggleAddPlayerForm(){
    this.showAddPlayerForm = !this.showAddPlayerForm;
  }
  addHole(par: number, location?: string, latitude?: number, longitude?: number) {
    const newHole: Hole = {
      holeNumber: this.holes.length + 1,
      par: par,
      location: location,
      geolocation: latitude && longitude ? { lat: latitude, long: longitude } : undefined,
      playerScores: new Map<string, number>()
    };

    this.players.forEach(player => {
      player.scores.push(0);
      newHole.playerScores.set(player.id, 0);
    });

    this.holes.push(newHole);
    this.selectedHoleIndex = this.holes.length - 1;
    this.toggleHoleForm();
  }
  logButtonClick() {
    console.log('Button clicked');
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


export interface Hole {
    holeNumber: number;
    par: number;
    location?: string;
    geolocation?: { lat: number, long: number };
    name?: string;
    playerScores: Map<string, number>;
}
export interface Player{
  id: string,
  name: string,
  scores: number[]
}

