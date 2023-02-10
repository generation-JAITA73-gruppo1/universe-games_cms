import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from '../service/news.service';
import { News } from '../model/news';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css']
})
export class FormNewsComponent {
  news$!: Observable<NewsService[]>

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    publicationDate: new FormControl('', [Validators.required]),
    authorName: new FormControl('', [Validators.required]),
    tags: new FormArray([
      new FormControl('', [Validators.required]),
    ])
  });
  
  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.newsService.postNews(this.form.getRawValue()).subscribe(() => {
      this.router.navigateByUrl('lista/news'),
      console.log(this.form.getRawValue())
    })

    if(this.form.invalid) {
      alert('Compila tutti i campi!')
      return
    }
  }

  get tagsFormArray() {
    return this.form.get('tags') as FormArray
  }

  onClickAddTags() {
    this.tagsFormArray.push(new FormControl('', [Validators.required]))
  }

  onRemoveTags(index: number): void {
    this.tagsFormArray.removeAt(index)
  }

  

  

  

  
}
