import { Books } from './books';
import { Translation } from './translations';

export interface Chapter {
  /**
   * The translation information for the book chapter.
   */
  translation: Translation;

  /**
   * The book information for the book chapter.
   */
  book: Books;

  /**
   * The link to the current chapter.
   */
  thisChapterLink: string;

  /**
   * The link to the regular (non-simplified) version of this chapter.
   */
  fullChapterApiLink: string;

  /**
   * The links to different audio versions for the chapter.
   */
  thisChapterAudioLinks: TranslationBookChapterAudioLinks;

  /**
   * The links to the audio timings for different audio versions for the chapter.
   * See "Get the Audio Timings for a Chapter" in the standard format docs -
   * the timings file is the same regardless of which chapter format linked to it.
   */
  thisChapterAudioTimings: TranslationBookChapterAudioTimingsLinks;

  /**
   * The link to the next chapter, in the simplified format.
   * Null if this is the last chapter in the translation.
   */
  nextChapterApiLink: string | null;

  /**
   * The links to different audio versions for the next chapter.
   * Null if this is the last chapter in the translation.
   */
  nextChapterAudioLinks: TranslationBookChapterAudioLinks | null;

  /**
   * The links to the audio timings for different audio versions for the next chapter.
   * Null if this is the last chapter in the translation.
   */
  nextChapterAudioTimings: TranslationBookChapterAudioTimingsLinks | null;

  /**
   * The link to the previous chapter, in the simplified format.
   * Null if this is the first chapter in the translation.
   */
  previousChapterApiLink: string | null;

  /**
   * The links to different audio versions for the previous chapter.
   * Null if this is the first chapter in the translation.
   */
  previousChapterAudioLinks: TranslationBookChapterAudioLinks | null;

  /**
   * The links to the audio timings for different audio versions for the previous chapter.
   * Null if this is the first chapter in the translation.
   */
  previousChapterAudioTimings: TranslationBookChapterAudioTimingsLinks | null;

  /**
   * The number of verses that the chapter contains.
   */
  numberOfVerses: number;

  /**
   * The information for the chapter.
   */
  chapter: SimpleChapterData;
}

export interface SimpleChapterData {
  /**
   * The number of the chapter.
   */
  number: number;

  /**
   * The content of the chapter.
   */
  content: SimpleChapterContent[];

  /**
   * The list of footnotes that could not be associated with a verse.
   * Footnotes that belong to a verse are included on the verse itself,
   * so this list is usually empty.
   */
  footnotes: ChapterFootnote[];
}

/**
 * A union type that represents a single piece of content in a simplified chapter.
 */
type SimpleChapterContent =
  SimpleChapterHeading | ChapterLineBreak | SimpleChapterVerse | SimpleChapterHebrewSubtitle;

/**
 * A heading in a chapter.
 */
interface SimpleChapterHeading {
  /**
   * Indicates that the content represents a heading.
   */
  type: 'heading';

  /**
   * The text of the heading.
   */
  text: string;
}

/**
 * A line break in a chapter.
 */
interface ChapterLineBreak {
  /**
   * Indicates that the content represents a line break.
   */
  type: 'line_break';
}

/**
 * A verse in a chapter.
 */
interface SimpleChapterVerse {
  /**
   * Indicates that the content is a verse.
   */
  type: 'verse';

  /**
   * The number of the verse.
   */
  number: number;

  /**
   * The text of the verse.
   * Lines of poetry and line breaks are separated by newline (\n) characters.
   */
  text: string;

  /**
   * The footnotes that occur in the verse.
   */
  footnotes: SimpleVerseFootnote[];

  /**
   * The headings that occur in the middle of the verse.
   * Omitted if the verse contains no inline headings.
   */
  headings?: SimpleInlineHeading[];

  /**
   * The ranges of the verse text that represent the Words of Jesus.
   * Omitted if the verse contains none.
   */
  wordsOfJesus?: SimpleTextRange[];

  /**
   * The ranges of the verse text that represent lines of poetry.
   * Omitted if the verse contains none.
   */
  poem?: SimplePoemRange[];
}

/**
 * A Hebrew Subtitle in a chapter.
 * These are often included as informational content that appeared in the original manuscripts.
 * For example, Psalms 49 has the Hebrew Subtitle "To the choirmaster. A Psalm of the Sons of Korah."
 */
interface SimpleChapterHebrewSubtitle extends Omit<SimpleChapterVerse, 'type' | 'number'> {
  /**
   * Indicates that the content represents a Hebrew Subtitle.
   */
  type: 'hebrew_subtitle';
}

/**
 * A footnote in a verse.
 */
interface SimpleVerseFootnote {
  /**
   * The ID of the note.
   */
  noteId: number;

  /**
   * The index in the verse text that the footnote caller should be inserted at.
   */
  offset: number;

  /**
   * The text of the footnote.
   */
  text: string;

  /**
   * The caller that should be used for the footnote.
   * If "+", then the caller should be autogenerated.
   * If null, then the caller should be empty.
   * If a string, then the caller should be that string.
   */
  caller: '+' | string | null;
}

/**
 * A heading that is embedded in a verse.
 */
interface SimpleInlineHeading {
  /**
   * The index in the verse text that the heading occurs at.
   */
  offset: number;

  /**
   * The text of the heading.
   */
  text: string;
}

/**
 * A range of text inside a verse.
 */
interface SimpleTextRange {
  /**
   * The index of the first character of the range.
   */
  start: number;

  /**
   * The index after the last character of the range.
   */
  end: number;
}

/**
 * A range of text inside a verse that represents a line of poetry.
 */
interface SimplePoemRange extends SimpleTextRange {
  /**
   * The level of indent that the line of poetry should be displayed with.
   */
  level: number;
}

/**
 * Information about a footnote.
 */
interface ChapterFootnote {
  /**
   * The ID of the note that is referenced.
   */
  noteId: number;

  /**
   * The text of the footnote.
   */
  text: string;

  /**
   * The verse reference for the footnote.
   */
  reference?: {
    chapter: number;
    verse: number;
  };

  /**
   * The caller that should be used for the footnote.
   * For footnotes, a "caller" is the character that is used in the text to reference to footnote.
   *
   * For example, in the text:
   * Hello (a) World
   *
   * ----
   * (a) This is a footnote.
   *
   * The "(a)" is the caller.
   *
   * If "+", then the caller should be autogenerated.
   * If null, then the caller should be empty.
   * If a string, then the caller should be that string.
   */
  caller: '+' | string | null;
}

/**
 * The audio links for a book chapter.
 */
interface TranslationBookChapterAudioLinks {
  /**
   * The reader for the chapter and the URL link to the audio file.
   */
  [reader: string]: string;
}

/**
 * The audio timings links for a book chapter.
 */
interface TranslationBookChapterAudioTimingsLinks {
  /**
   * The reader for the chapter and the API link to the audio timings file for that reader.
   */
  [reader: string]: string;
}
