import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Photo} from '../models/photo';
import {map, catchError} from 'rxjs/internal/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = environment.photoApiUrl;

  constructor(private http: HttpClient) {
  }

  public list(start = 0, limit = 9): Observable<Photo[]> {
    const params = {
      '_start': <string><any>start,
      '_limit': <string><any>limit
    };

    return this.http.get<Photo[]>(this.apiUrl, {
      params: params
    }).pipe(
      map(results => results.map(this.sanitizeData)),
      catchError((error) => {
        console.log(error);

        return of([]);
      })
    );
  }

  private sanitizeData(data: any): Photo {
    return {
      id: data.id,
      title: data.title,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl
    };
  }
}
