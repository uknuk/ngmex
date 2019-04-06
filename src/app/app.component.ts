import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiService, Track } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  player: HTMLAudioElement;
  tab: number;
  api: ApiService;
  arts: Object;
  artNames: Array<string>;
  art: string;
  selArt: string;
  selTracks: object;
  selAlbs: Array<string>;
  alb: string;
  tracks: Array<Track>;
  track: string;
  trackNum: number;

  constructor(api: ApiService) {
    this.api = api;
    api.getArtists().subscribe(arts => {
      this.arts = arts
      this.artNames = Object.keys(arts);
    });
    this.tab = 0;
  }

  ngAfterViewInit() {
    this.player = <HTMLAudioElement> document.getElementById('player');
    this.player.onended = () => this.next();
  }

  selectArtist(event: any, art: string) {
    this.selArt = art;
    this.api.getTracks(art, this.arts[art]).subscribe(tracks => {
      this.selTracks = tracks;
      this.selAlbs = Object.keys(tracks);
    });
    this.tab = 0;
  }

  selectAlbum(event: any, alb: string) {
    this.alb = alb;
    this.art = this.selArt;
    this.tracks = this.selTracks[alb];

    this.play(null, 0);
  }

  play(event: any, num: number) {
    this.trackNum = num;
    const track = this.tracks[num];
    this.track = track.name;
    this.player.src = `${environment.baseUrl}/media?path=${track.path}`;
    this.player.play().catch();
  }

  next() {
    let num = this.trackNum + 1;
    if (num < this.tracks.length)
      this.play(null, num);
  }

  setTab($event) {
    if ($event != this.tab)
      this.tab = $event;
  }
}
