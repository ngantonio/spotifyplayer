import { Component, OnInit } from '@angular/core';
import { SpotifyHandlerService } from 'src/app/services/spotify-handler.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  playlists: any = [];

  constructor(private spotifyHandlerService: SpotifyHandlerService) { }

  async ngOnInit(): Promise<void> {
    await this.getPlaylists();
  }

  async getPlaylists(): Promise<void> {
    await this.spotifyHandlerService.spotifyClient.getUserPlaylists()
      .then((playlists) => {
        this.playlists = playlists.items
      }).catch((err) => {
        console.log(err)
      })
  }

  async selectPlaylist(playlist: any): Promise<void> {
    await this.spotifyHandlerService.spotifyClient.getPlaylist(playlist.id)
      .then((playlist) => {
        this.spotifyHandlerService.setCurrentPlaylist(playlist)
        let firstSong: any = playlist.tracks.items[0];
        firstSong.procesedArtists = `${firstSong.track.artists.map((artist: any) => artist.name).join(", ")} - ${firstSong.track.album.name}`
        this.spotifyHandlerService.setCurrentSong(firstSong)
      }).catch((err) => {
        console.log(err)
      })
  }
}
