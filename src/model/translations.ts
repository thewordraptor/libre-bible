export interface Translations {
  /**
   * The list of translations.
   */
  translations: Translation[];
}

export interface Translation {
  /**
   * The ID of the translation.
   */
  id: string;

  /**
   * The name of the translation.
   * This is usually the name of the translation in the translation's language.
   */
  name: string;

  /**
   * The English name of the translation.
   */
  englishName: string;

  /**
   * The website for the translation.
   */
  website: string;

  /**
   * The URL that the license for the translation can be found.
   */
  licenseUrl: string;

  /**
   * The short name for the translation.
   */
  shortName: string;

  /**
   * The ISO 639  3-letter language tag that the translation is primarily in.
   */
  language: string;

  /**
   * Gets the name of the language that the translation is in.
   * Null or undefined if the name of the language is not known.
   */
  languageName?: string;

  /**
   * Gets the name of the language in English.
   * Null or undefined if the language doesn't have an english name.
   */
  languageEnglishName?: string;

  /**
   * The direction that the language is written in.
   * "ltr" indicates that the text is written from the left side of the page to the right.
   * "rtl" indicates that the text is written from the right side of the page to the left.
   */
  textDirection: 'ltr' | 'rtl';

  /**
   * The available list of formats.
   */
  availableFormats: ('json' | 'usfm')[];

  /**
   * The API link for the list of available books for this translation.
   */
  listOfBooksApiLink: string;

  /**
   * The number of books that are contained in this translation.
   *
   * Complete translations should have the same number of books as the Bible (66).
   */
  numberOfBooks: number;

  /**
   * The total number of chapters that are contained in this translation.
   *
   * Complete translations should have the same number of chapters as the Bible (1,189).
   */
  totalNumberOfChapters: number;

  /**
   * The total number of verses that are contained in this translation.
   *
   * Complete translations should have the same number of verses as the Bible (around 31,102 - some translations exclude verses based on the aparent likelyhood of existing in the original source texts).
   */
  totalNumberOfVerses: number;

  /**
   * The total number of apocryphal books that are contained in this translation.
   * Omitted if the translation does not include apocrypha.
   */
  numberOfApocryphalBooks?: number;

  /**
   * The total number of apocryphal chapters that are contained in this translation.
   * Omitted if the translation does not include apocrypha.
   */
  totalNumberOfApocryphalChapters?: number;

  /**
   * the total number of apocryphal verses that are contained in this translation.
   * Omitted if the translation does not include apocrypha.
   */
  totalNumberOfApocryphalVerses?: number;
}
