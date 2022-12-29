import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import {map} from 'rxjs/operators';
import {NgForm} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<{ [key: string]: Post }>('https://cocinitasapp-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }));
  }

  createPost(postForm: NgForm) {
    return this.http.post<{ name: string }>(
      'https://cocinitasapp-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {title: postForm.value.title, content: postForm.value.content, date: new Date()});
  }

  deletePosts() {
    return this.http.delete('https://cocinitasapp-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
  }
}
