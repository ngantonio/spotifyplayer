import { Injectable } from '@angular/core';
import { Token } from '../interfaces/Spotify.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import SpotifyWebApi from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyHandlerService {

  private authEndpoint = 'https://accounts.spotify.com/authorize';
  private clientId = 'c2ea8bccd3c943d29c12c5fddbbbdadf';
  private scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ]
  private redirectUri = 'http://localhost:4200/';
  private loginUrl = `${this.authEndpoint}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scopes=${this.scopes.join("%20")}&response_type=token&show_dialog=true`;
  private token!: Token;
  private spotify_client = new SpotifyWebApi();

  constructor(private http: HttpClient) { }

  get login(): string {
    return this.loginUrl;
  }

  get spotifyClient(): SpotifyWebApi.SpotifyWebApiJs {
    return this.spotify_client;
  }

  authentication(): string {

    let spotify_token = sessionStorage.getItem('spotify_token')

    // si el token existe ya en el localstorage, se setea, se inicializa el cliente y se regresa 
    if (spotify_token !== null && spotify_token !== undefined) {
      this.token = JSON.parse(spotify_token);
      this.initializeClient()
      return this.token.access_token

    } else {
      // sino, es porque el cliente se está logueando
      const windowHash = window.location.hash.substring(1).split("&");
      if (windowHash.length > 1) {
        this.token = windowHash.reduce((initial: any, item: any) => {
          // #accessToken=mysupertoken&name=myname
          const parts: string[] = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
          return initial;
        }, {});
        sessionStorage.setItem("spotify_token", JSON.stringify(this.token));
        window.location.hash = "";
        return this.token.access_token
      } else {
        return "";
      }
    }

  }

  initializeClient(): void {
    this.spotifyClient.setAccessToken(this.token.access_token)

  }

}
