import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpotifyHandlerService } from 'src/app/services/spotify-handler.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PlayerComponent implements OnInit {

  current_playlist!: any;

  constructor(public spotifyHandlerService: SpotifyHandlerService) { }

  async ngOnInit(): Promise<void> {
    await this.getWeeklyPlaylist()
    this.current_playlist = this.spotifyHandlerService.currentPlaylist;
  }

  async getWeeklyPlaylist(): Promise<void> {
    await this.spotifyHandlerService.spotifyClient.getPlaylist('37i9dQZEVXcQTSfEo8Ezt3')
      .then((playlist) => {
        this.spotifyHandlerService.setCurrentPlaylist(playlist)
        let firstSong: any = playlist.tracks.items[0];
        firstSong.procesedArtists = `${firstSong.track.artists.map((artist: any) => artist.name).join(", ")} - ${firstSong.track.album.name}`
        this.spotifyHandlerService.setCurrentSong(firstSong)
      }).catch((err) => {
        console.log(err)
      })

    // this.spotifyHandlerService.spotifyClient.getMySavedAlbums
  }


}

