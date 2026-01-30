export type SubmissionStatus = "draft" | "submitted";

export interface BookKeepingFormData {
  book_name: string;
  author: string;
  book_date: string;
  total_book: string;
  description: string;
}

export const INITIAL_FORM_DATA: BookKeepingFormData = {
  book_name: "",
  author: "",
  book_date: "",
  total_book: "",
  description: "",
};

export const DRAFT_STORAGE_KEY = "bookKeepingSubmissionDraft";

export interface StoredDraft {
  formData: BookKeepingFormData;
  status: "draft";
}
