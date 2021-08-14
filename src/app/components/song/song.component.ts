import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongComponent implements OnInit {

  @Input() track!: any
  artists: string = "";

  constructor() { }

  ngOnInit(): void {
    this.artists = `${this.track.artists.map((artist: any) => artist.name).join(", ")} - ${this.track.album.name}`
  }

}
