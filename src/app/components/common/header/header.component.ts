import { Component, OnInit } from '@angular/core';
import { SpotifyHandlerService } from 'src/app/services/spotify-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = {}
  userImage: string = ""
  username: string = "User"

  constructor(private spotifyHandlerService: SpotifyHandlerService) { }

  async ngOnInit(): Promise<void> {
    await this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    await this.spotifyHandlerService.spotifyClient.getMe()
      .then((user: any) => {
        this.user = user
        this.userImage = this.user.images[0].url;
        this.username = this.user.display_name;
      }).catch((err: any) => {
        console.log(err)
      })
  }
}
