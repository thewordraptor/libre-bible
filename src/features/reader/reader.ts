import { Component, signal } from '@angular/core';
import { SearchBar } from './search-bar/search-bar';
import { SimpleChapterData } from '@model/chapter';

@Component({
  imports: [SearchBar],
  selector: 'bible-reader',
  styleUrl: './reader.scss',
  templateUrl: './reader.html',
})
export class Reader {
  protected chapterData = signal<SimpleChapterData>({
    number: 0,
    content: [],
    footnotes: [],
  });
}
