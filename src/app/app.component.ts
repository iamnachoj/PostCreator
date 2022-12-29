import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {NgForm} from '@angular/forms';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  creatingError: string;
  fetchingError: string;
  isLoading = false;
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostsService) {
  }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postForm: NgForm) {
    this.isLoading = true;
    this.postService.createPost(postForm)
      .subscribe(
        (response) => {
          this.onFetchPosts();
          postForm.reset();
          this.isLoading = false;
        },
        (error) => {
          this.creatingError = error.statusText + '. Please try again later';
        });
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.getPosts()
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
        (error) => {
          this.fetchingError = error.statusText + '. Please try again later';
        });
  }

  onClearPosts() {
    this.postService.deletePosts()
      .subscribe(response => {
        this.loadedPosts = [];
        console.log('Posts removed');
      });
  }
}
