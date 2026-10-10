import { Component, computed, inject, signal, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Data } from '@services/data/data';
import { SearchSelect } from './search-select/search-select';
import { BooksWithChapters } from '@model/books-with-chapters';
import { SimpleChapterData } from '@model/chapter';

@Component({
  imports: [SearchSelect],
  selector: 'bible-search-bar',
  styleUrl: './search-bar.scss',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  private data = inject(Data);

  private emptyOption = { id: '', value: '' };

  langObject = toSignal(this.data.getAvailableTranslations(), { initialValue: { 'No Data': [] } });

  languages = computed(() =>
    Object.keys(this.langObject()).map((item) => ({ id: item, value: item })),
  );

  selectedLang = signal<{ id: string; value: string }>(this.emptyOption);

  translations = computed(() => this.langObject()[this.selectedLang().id]);

  selectedTranslation = signal<{ id: string; value: string }>(this.emptyOption);

  bookObject = signal<BooksWithChapters>({ 'No Data': 0 });

  books = computed(() => Object.keys(this.bookObject()).map((item) => ({ id: item, value: item })));

  selectedBook = signal<{ id: string; value: string }>(this.emptyOption);

  chapters = computed(() => {
    const booksMap = this.bookObject() as Record<string, number>;
    const bookKey = this.selectedBook()?.id || '';
    const totalChapters = Number(booksMap[bookKey] || 0);

    return Array.from({ length: totalChapters }, (_, i) => ({
      id: String(i + 1),
      value: String(i + 1),
    }));
  });

  selectedChapter = signal<{ id: string; value: string }>(this.emptyOption);

  chapterData = output<SimpleChapterData>();

  setLang(value: { id: string; value: string }) {
    this.selectedLang.set(value);
    this.selectedTranslation.set(this.emptyOption);
    this.selectedBook.set(this.emptyOption);
    this.selectedChapter.set(this.emptyOption);
  }

  setTranslation(value: { id: string; value: string }) {
    this.selectedTranslation.set(value);
    this.selectedBook.set(this.emptyOption);
    this.selectedChapter.set(this.emptyOption);
    this.data.getAvailableBooks(value.id).subscribe({
      next: (booksMap) => {
        this.bookObject.set(booksMap);
      },
      error: () => {
        this.bookObject.set({ 'No Data': 0 });
      },
    });
  }

  setBook(value: { id: string; value: string }) {
    this.selectedBook.set(value);
    this.selectedChapter.set(this.emptyOption);
  }

  setChapter(value: { id: string; value: string }) {
    this.selectedChapter.set(value);
    this.data
      .getChapterDetails(this.selectedTranslation().id, this.selectedBook().id, value.id)
      .subscribe({
        next: (booksMap) => {
          this.chapterData.emit(booksMap.chapter);
        },
        error: () => {},
      });
  }
}
