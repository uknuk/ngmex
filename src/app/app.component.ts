import { Component } from '@angular/core';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  template: `
    <mat-tab-group>
      <mat-tab label="Player">
        <h3>
          Sweet 74_Desolation_Boulevard 01-The Six Teens.mp3
        </h3>
        <audio [src]="trackPath" controls>
        </audio>
      </mat-tab>
      <mat-tab  label="Artists">
      </mat-tab>
    </mat-tab-group>
  `,
  styles: []
})
export class AppComponent {
  title = 'NgMEX';
  trackPath = `${environment.baseUrl}/media?path=Music/Sweet/74_Desolation_Boulevard/01-The Six Teens.mp3`;
}
