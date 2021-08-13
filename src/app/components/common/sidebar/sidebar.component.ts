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

}
