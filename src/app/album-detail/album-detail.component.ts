import { Component, OnInit } from '@angular/core';
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

  goBack(): void {
    this.location.back();
  }

}
