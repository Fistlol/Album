import {Component, OnInit} from '@angular/core';
import {Album} from '../album';
import {AlbumsService} from '../albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums: Album[];
  album: Album;
  title: string;
  userId: number;
  loading: boolean;
  creation: boolean;

  constructor(
    private albumService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void {
    this.loading = true;
    this.albumService.getAlbums().subscribe((albums) => {
      this.albums = albums;
      this.loading = false;
    });
  }

  onSubmit(event: any): void {
    this.title = event.target.title.value;
    this.userId = event.target.userId.value;
    console.log(event.target.title.value, event.target.userId.value);
  }

  createAlbum(album: Album): void {
    this.creation = true;
    this.albumService.createAlbum(album).subscribe((data) => {
      data.title = this.title;
      data.userId = this.userId;
      this.album = data;
      console.log(this.album);
    });
  }

  deleteAlbum(id: number): void {
    this.albums = this.albums.filter((x) => x.id !== id);
    this.albumService.deleteAlbum(id).subscribe();
  }
}
