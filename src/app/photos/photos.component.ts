import {Component, OnInit} from '@angular/core';
import {Photo} from '../models/photo';
import {PhotoService} from '../services/photos';
import {environment} from '../../environments/environment';
import {ModalService} from '../services/modals';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  public photos: Photo[] = [];
  public photoUrl: string;

  public showLoadMore = true;

  private start = environment.photoStartPage;
  private limit = environment.photoPerPage;

  constructor(
    private photoService: PhotoService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.photoService.list(this.start).subscribe((photos) => {
      if (photos.length === 0) {
        this.showLoadMore = false;
      }

      this.photos.push(...photos);
    });
  }

  loadMore() {
    this.start += this.limit;

    this.list();
  }

  openModal(id: string, url: string) {
    this.photoUrl = url;
    this.modalService.open(id);
  }

}
