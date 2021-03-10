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
  loading: boolean;

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

  deleteAlbum(id: number): void {
    this.albums = this.albums.filter((x) => x.id !== id);
    this.albumService.deleteAlbum(id).subscribe();
  }
}
