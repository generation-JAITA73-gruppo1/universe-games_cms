import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewsService } from '../service/news.service';
import { NewNews, News } from '../model/news';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-form-news',
  templateUrl: './form-news.component.html',
  styleUrls: ['./form-news.component.css'],
})
export class FormNewsComponent implements OnInit {
  news$!: Observable<NewsService[]>;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    publicationDate: new FormControl('', [Validators.required]),
    authorName: new FormControl('', [Validators.required]),
    tags: new FormArray([new FormControl('', [Validators.required])]),
  });

  isEditMode: boolean = false;
  idModifiable: string = '';
  noModifiable = false;
  __vModifiable = 0;

  // lista delle categorie/console che servirà nel slect del template per scegliere la console giusta
  categoryList: string[] = [];

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {}

  reset() {
    this.form.reset();
    this.isEditMode = false;
    this.noModifiable = false;
    this.idModifiable = '';
    this.__vModifiable = 0;
  }

  ngOnInit(): void {
    this.categoriaService.getCategorie().subscribe((list) => {
      this.categoryList = list.map((obj) => obj.name as string);
    });

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id !== undefined) {
        //console.log('id check passed');
        this.isEditMode = true;
        this.idModifiable = id;
        this.newsService.getNewsId(id).subscribe({
          next: (newsData) => {
            const datoNews = newsData;
            this.__vModifiable = datoNews.__v;
            this.form = new FormGroup({
              title: new FormControl(datoNews.title, [Validators.required]),

              category: new FormControl(datoNews.category, [
                Validators.required,
              ]),

              imageUrl: new FormControl(datoNews.imageUrl, [
                Validators.required,
              ]),

              content: new FormControl(datoNews.content, [Validators.required]),

              publicationDate: new FormControl(datoNews.publicationDate, [
                Validators.required,
              ]),

              authorName: new FormControl(datoNews.authorName, [
                Validators.required,
              ]),

              tags: new FormArray(
                datoNews.tags.map(
                  (t) => new FormControl(t, [Validators.required])
                )
              ),
            });
          },
          error: (error) => {
            console.log(error);
            this.noModifiable = true;
          },
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Compila tutti i campi!');
      return;
    }

    if (this.isEditMode) {
      console.log('AGGIORNAMENTO RECORD');
      const modNews = this.form.getRawValue();

      this.newsService
        .putNews(this.idModifiable, modNews, this.__vModifiable)
        .subscribe(() => {
          this.reset();
          this.router.navigateByUrl('lista/news');
          alert('record aggiornato');
        });
    } else {
      console.log('AGGIUNTA RECORD');

      this.newsService.postNews(this.form.getRawValue()).subscribe(() => {
        alert('record aggiunto');
        this.reset();
        this.router.navigateByUrl('/lista/news');
      });
    }
  }

  get tagsFormArray() {
    return this.form.get('tags') as FormArray;
  }

  onClickAddTags() {
    this.tagsFormArray.push(new FormControl('', [Validators.required]));
  }

  onRemoveTags(index: number): void {
    this.tagsFormArray.removeAt(index);
  }

  ngOnDestroy(): void {}
}
