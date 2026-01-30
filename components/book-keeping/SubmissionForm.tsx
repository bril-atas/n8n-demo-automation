"use client";

import type { BookKeepingFormData } from "@/app/book-keeping/submission/types";

const TODAY_ISO = new Date().toISOString().split("T")[0];

export interface SubmissionFormProps {
  formData: BookKeepingFormData;
  errors: Record<string, string>;
  onChange: (field: keyof BookKeepingFormData, value: string) => void;
  /** All required fields are validated on blur for immediate user feedback when leaving each field (per ticket). */
  onBlur: (field: keyof BookKeepingFormData) => void;
  readOnly: boolean;
}

export function SubmissionForm({
  formData,
  errors,
  onChange,
  onBlur,
  readOnly,
}: SubmissionFormProps) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="book_name"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Book Name <span className="text-[#DC2626]">*</span>
        </label>
        <input
          id="book_name"
          type="text"
          maxLength={150}
          value={formData.book_name}
          onChange={(e) => onChange("book_name", e.target.value)}
          onBlur={() => onBlur("book_name")}
          readOnly={readOnly}
          disabled={readOnly}
          aria-invalid={!!errors.book_name}
          aria-describedby={errors.book_name ? "book_name-error" : undefined}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 read-only:bg-zinc-100 read-only:opacity-90 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:read-only:bg-zinc-800"
        />
        {errors.book_name && (
          <p
            id="book_name-error"
            className="mt-1 text-sm"
            style={{ color: "#DC2626" }}
          >
            {errors.book_name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="author"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Author <span className="text-[#DC2626]">*</span>
        </label>
        <input
          id="author"
          type="text"
          maxLength={100}
          value={formData.author}
          onChange={(e) => onChange("author", e.target.value)}
          onBlur={() => onBlur("author")}
          readOnly={readOnly}
          disabled={readOnly}
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? "author-error" : undefined}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 read-only:bg-zinc-100 read-only:opacity-90 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:read-only:bg-zinc-800"
        />
        {errors.author && (
          <p
            id="author-error"
            className="mt-1 text-sm"
            style={{ color: "#DC2626" }}
          >
            {errors.author}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="book_date"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Book Date <span className="text-[#DC2626]">*</span>
        </label>
        <input
          id="book_date"
          type="date"
          max={TODAY_ISO}
          value={formData.book_date}
          onChange={(e) => onChange("book_date", e.target.value)}
          onBlur={() => onBlur("book_date")}
          readOnly={readOnly}
          disabled={readOnly}
          aria-invalid={!!errors.book_date}
          aria-describedby={errors.book_date ? "book_date-error" : undefined}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 read-only:bg-zinc-100 read-only:opacity-90 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:read-only:bg-zinc-800"
        />
        {errors.book_date && (
          <p
            id="book_date-error"
            className="mt-1 text-sm"
            style={{ color: "#DC2626" }}
          >
            {errors.book_date}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="total_book"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Total Book <span className="text-[#DC2626]">*</span>
        </label>
        <input
          id="total_book"
          type="number"
          min={1}
          value={formData.total_book}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "" || /^\d+$/.test(v)) onChange("total_book", v);
          }}
          onBlur={() => onBlur("total_book")}
          readOnly={readOnly}
          disabled={readOnly}
          aria-invalid={!!errors.total_book}
          aria-describedby={errors.total_book ? "total_book-error" : undefined}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 read-only:bg-zinc-100 read-only:opacity-90 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:read-only:bg-zinc-800"
        />
        {errors.total_book && (
          <p
            id="total_book-error"
            className="mt-1 text-sm"
            style={{ color: "#DC2626" }}
          >
            {errors.total_book}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          maxLength={255}
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          onBlur={() => onBlur("description")}
          readOnly={readOnly}
          disabled={readOnly}
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-900 read-only:bg-zinc-100 read-only:opacity-90 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:read-only:bg-zinc-800"
        />
        {errors.description && (
          <p
            id="description-error"
            className="mt-1 text-sm"
            style={{ color: "#DC2626" }}
          >
            {errors.description}
          </p>
        )}
      </div>
    </div>
  );
}
