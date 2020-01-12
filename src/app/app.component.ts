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
  artNames: string[];
  art: string;
  selArt: string;
  selTracks: object;
  selAlbs: string[];
  albs: string[];
  alb: string;
  tracks: Track[];
  track: string;
  trackNum: number;

  constructor(api: ApiService) {
    this.api = api;
  }

  async ngAfterViewInit() {
    this.player = <HTMLAudioElement> document.getElementById('player');
    this.player.onended = () => this.next();

    this.arts = await this.api.getArtists().toPromise();
    this.artNames = Object.keys(this.arts).sort();
    const last = JSON.parse(localStorage.getItem("last"))
    if (last && last.art) {
      await this.selectArtist(null, last.art);
      if (last.alb)
        this.selectAlbum(null, last.alb, true, last.num)
    }
  }

  async selectArtist(event: any, art: string) {
    this.selArt = art;
    this.selTracks = await this.api.getTracks(art, this.arts[art]).toPromise();
    this.selAlbs = Object.keys(this.selTracks);
    this.tab = 0;
  }

  selectAlbum(event: any, alb: string, play: boolean, num: number = 0) {
    this.albs = this.selAlbs;
    this.alb = alb;
    this.art = this.selArt;
    this.tracks = this.selTracks[alb];
    this.selectTrack(null, num, play);
  }

  async selectTrack(event: any, num: number, play: boolean = true) {
    this.trackNum = num;
    const track = this.tracks[num];
    this.track = track.name;
    if (play)
    {
      this.player.src = `${environment.baseUrl}/media?path=${track.path}`;
      this.player.play().catch();
    }
    this.save()
  }

  next() {
    let num = this.trackNum + 1;
    if (num < this.tracks.length)
      this.selectTrack(null, num, false);
    else {
      let nextAlbNum = this.albs.indexOf(this.alb) + 1;
      if (nextAlbNum < this.albs.length)
        this.selectAlbum(null, this.albs[nextAlbNum], true);
      else
        return;
    }
    window.location.reload()
    // needed because the view is not refreshed under electron
  }

  save() {
    localStorage.setItem("last", JSON.stringify({
      art: this.art,
      alb: this.alb,
      num: this.trackNum
    }))
  }

  setTab($event) {
    if ($event != this.tab)
      this.tab = $event;
      if ($event === 0)
        this.player.play().catch();
  }

  cancelSelection($event) {
    this.selArt = this.art;
  }
}