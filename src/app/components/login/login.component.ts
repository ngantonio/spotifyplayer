import { Component, OnInit } from '@angular/core';
import { SpotifyHandlerService } from 'src/app/services/spotify-handler.service';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUrl: string = '';

  constructor(private spotifyHandlerService: SpotifyHandlerService) { }

  ngOnInit(): void {
    this.loginUrl = this.spotifyHandlerService.login;

  }

}
