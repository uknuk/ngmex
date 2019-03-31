import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  track = 'Sweet/74_Desolation_Boulevard/01-The Six Teens.mp3';
  arts: Object;
  artNames: Array<string>;

  constructor(service: ApiService) {
    service.getArtists().subscribe(arts => {
      this.arts = arts
      this.artNames = Object.keys(arts);
    });
  }

  ngAfterViewInit() {
    let player = <HTMLAudioElement> document.getElementById('player');
    player.src = `${environment.baseUrl}/media?path=Music/${this.track}`;
    player.play().catch();
  }
}
