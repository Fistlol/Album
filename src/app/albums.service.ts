import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ALBUMS} from './albums';
import {Album} from './album';
import {Photo} from './photo';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  url = 'https://jsonplaceholder.typicode.com';
  options = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  constructor(
    private http: HttpClient
  ) {
  }

  // getAlbums(): Observable<Album[]> {
  //   return of(ALBUMS);
  // }
  //
  // getAlbum(id: number): Observable<Album> {
  //   const album = ALBUMS.find((x) => x.id === id);
  //   return of(album);
  // }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.url}/albums`);
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.url}/albums/${id}`);
  }

  getPhotos(id: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.url}/albums/${id}/photos`);
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${this.url}/albums`, album);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.url}/albums/${album.id}`, album);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/albums/${id}`);
  }
}
