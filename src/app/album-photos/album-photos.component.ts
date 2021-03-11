import { Component, OnInit } from '@angular/core';
import {Album} from '../album';
import {AlbumsService} from '../albums.service';
import {Location} from '@angular/common';
import {Photo} from '../photo';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.scss']
})
export class AlbumPhotosComponent implements OnInit {
  loading: boolean;
  photos: Photo[];
  constructor(
    private albumService: AlbumsService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');
      this.getPhotos(id);
    });
  }

  getPhotos(id: number): void {
    this.loading = true;
    this.albumService.getPhotos(id).subscribe((photos) => {
      this.photos = photos;
      this.loading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
