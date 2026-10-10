import { inject, Service } from '@angular/core';
import { Books } from '@model/books';
import { BooksWithChapters } from '@model/books-with-chapters';
import { Chapter } from '@model/chapter';
import { Lang } from '@model/lang';
import { Translations } from '@model/translations';
import { Api } from '@services/api/api';
import { Observable, map } from 'rxjs';

@Service()
export class Data {
  private api = inject(Api);

  getAvailableTranslations(): Observable<Lang> {
    return this.api.get<Translations>('available_translations.json').pipe(
      map((rawEntries) => {
        return rawEntries.translations.reduce((acc: Lang, item) => {
          const langGroup = item.languageEnglishName || 'Other';

          if (!acc[langGroup]) {
            acc[langGroup] = [];
          }

          acc[langGroup].push({
            id: item.id,
            value: item.shortName,
          });

          return acc;
        }, {});
      }),
    );
  }

  getAvailableBooks(translation: string): Observable<BooksWithChapters> {
    return this.api.get<Books>(translation + '/books.json').pipe(
      map((data: Books) => {
        const result: BooksWithChapters = {};
        for (const book of data.books) {
          result[book.id] = book.numberOfChapters;
        }
        return result;
      }),
    );
  }

  getChapterDetails(translation: string, book: string, chapter: string): Observable<Chapter> {
    return this.api.get([translation, book, chapter].join('/') + '.simple.json');
  }
}
