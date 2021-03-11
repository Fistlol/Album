import {Component, OnInit} from '@angular/core';
import {Album} from '../album';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AlbumsService} from '../albums.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  title: string;
  album: Album;
  loading: boolean;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private albumService: AlbumsService
  ) { }

  ngOnInit(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.album = ALBUMS.find((x) => x.id === id);

    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.getAlbum(id);
    });
  }

  getAlbum(id: number): void {
    this.loading = true;
    this.albumService.getAlbum(id).subscribe((album) => {
      this.album = album;
      this.loading = false;
    });
  }

  onSubmit(event: any): void {
    this.title = event.target.title.value;
    console.log(event.target.title.value);
  }

  updateAlbum(album: Album): void {
    this.albumService.updateAlbum(album).subscribe((data) => {
      data.title = this.title;
      this.album = data;
      console.log(this.album);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
