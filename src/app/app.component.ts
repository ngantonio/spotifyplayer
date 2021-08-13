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

  ngOnInit(): void {
    const access_token = this.spotifyHandlerService.authentication();
    if (access_token && access_token !== "") {
      this.isAuth = true;
      this.spotifyHandlerService.spotifyClient.getMe()
        .then((res: any) => {
          console.log(res)
        }).catch((err: any) => {
          console.log(err)
        })

    } else {
      this.isAuth = false;
    }

  }
}



