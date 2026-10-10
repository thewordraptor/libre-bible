import { Translation } from './translations';

export interface Books {
  /**
   * The translation information for the books.
   */
  translation: Translation;

  /**
   * The list of books that are available for the translation.
   */
  books: TranslationBook[];
}

interface TranslationBook {
  /**
   * The ID of the book.
   */
  id: string;

  /**
   * The name that the translation provided for the book.
   */
  name: string;

  /**
   * The common name for the book.
   */
  commonName: string;

  /**
   * The title of the book.
   * This is usually a more descriptive version of the book name.
   * If not available, then one was not provided by the translation.
   */
  title: string | null;

  /**
   * The numerical order of the book in the translation.
   */
  order: number;

  /**
   * The number of chapters that the book contains.
   */
  numberOfChapters: number;

  /**
   * The number of the first chapter in the book.
   */
  firstChapterNumber: number;

  /**
   * The link to the first chapter of the book.
   */
  firstChapterApiLink: string;

  /**
   * The number of the last chapter in the book.
   */
  lastChapterNumber: number;

  /**
   * The link to the last chapter of the book.
   */
  lastChapterApiLink: string;

  /**
   * The number of verses that the book contains.
   */
  totalNumberOfVerses: number;

  /**
   * Whether the book is an apocryphal book.
   * Omitted if the translation is canonical.
   */
  isApocryphal?: boolean;
}
