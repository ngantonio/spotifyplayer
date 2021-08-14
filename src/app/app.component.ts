import { Component, OnInit } from '@angular/core';
import { SpotifyHandlerService } from './services/spotify-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Your Spotify App';
  isAuth: boolean = false;

  constructor(private spotifyHandlerService: SpotifyHandlerService) { }

  async ngOnInit(): Promise<void> {
    this.authenticate()
  }

  authenticate() {
    const access_token = this.spotifyHandlerService.authentication();
    if (access_token && access_token !== "") {
      this.isAuth = true;

    } else {
      this.isAuth = false;
    }
  }
}



