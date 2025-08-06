import { Component } from '@angular/core';
import { PlayerOverviewComponent } from './player-overview/player-overview.component';

@Component({
  selector: 'app-root',
  imports: [PlayerOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'imposter';
}
