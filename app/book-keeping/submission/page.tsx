"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  INITIAL_FORM_DATA,
  DRAFT_STORAGE_KEY,
  type BookKeepingFormData,
  type SubmissionStatus,
  type StoredDraft,
} from "./types";
import { SubmissionForm } from "@/components/book-keeping/SubmissionForm";
import { ConfirmSubmitModal } from "@/components/book-keeping/ConfirmSubmitModal";

const TODAY_ISO = new Date().toISOString().split("T")[0];

function validateField(
  field: keyof BookKeepingFormData,
  formData: BookKeepingFormData
): string | null {
  const v = formData[field];
  switch (field) {
    case "book_name":
      if (!v?.trim()) return "This field is required";
      if (v.length > 150) return "Max 150 characters";
      return null;
    case "author":
      if (!v?.trim()) return "This field is required";
      if (v.length > 100) return "Max 100 characters";
      return null;
    case "book_date":
      if (!v?.trim()) return "This field is required";
      if (v > TODAY_ISO) return "Cannot select future date";
      return null;
    case "total_book": {
      if (v === "" || v === undefined) return "This field is required";
      const num = Number(v);
      if (Number.isNaN(num) || !Number.isInteger(num) || num < 1)
        return "Must be at least 1";
      return null;
    }
    case "description":
      if (v && v.length > 255) return "Max 255 characters";
      return null;
    default:
      return null;
  }
}

function validateAll(formData: BookKeepingFormData): Record<string, string> {
  const fields: (keyof BookKeepingFormData)[] = [
    "book_name",
    "author",
    "book_date",
    "total_book",
    "description",
  ];
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const msg = validateField(field, formData);
    if (msg) errors[field] = msg;
  }
  return errors;
}

/** True when all required fields are filled and pass validation (used to disable Submit until valid). */
function isFormValid(formData: BookKeepingFormData): boolean {
  return Object.keys(validateAll(formData)).length === 0;
}

export default function BookKeepingSubmissionPage() {
  const [formData, setFormData] = useState<BookKeepingFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>("draft");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" && window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed: StoredDraft = JSON.parse(raw);
        if (parsed?.formData && parsed?.status === "draft") {
          setFormData(parsed.formData);
          setStatus("draft");
        }
      }
    } catch {
      // ignore invalid stored draft
    }
  }, []);

  const handleChange = useCallback((field: keyof BookKeepingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Required fields validated on blur (per field) and on submit (validateAll in handleSubmitClick).
  const handleBlur = useCallback(
    (field: keyof BookKeepingFormData) => {
      const msg = validateField(field, formData);
      setErrors((prev) => {
        const next = { ...prev };
        if (msg) next[field] = msg;
        else delete next[field];
        return next;
      });
    },
    [formData]
  );

  const handleSaveDraft = useCallback(() => {
    const draft: StoredDraft = { formData, status: "draft" };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }
    setStatus("draft");
  }, [formData]);

  // Validation on submit: run validateAll, show errors or open confirmation modal only when validation passes.
  const handleSubmitClick = useCallback(() => {
    const allErrors = validateAll(formData);
    setErrors(allErrors);
    const valid = Object.keys(allErrors).length === 0;
    if (valid) {
      setModalOpen(true);
    } else {
      setTimeout(() => {
        const firstErrorField = Object.keys(allErrors)[0];
        document.getElementById(firstErrorField)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 0);
    }
  }, [formData]);

  const handleConfirmSubmit = useCallback(() => {
    setStatus("submitted");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, []);

  const readOnly = status === "submitted";
  const submitDisabled = !isFormValid(formData);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-[720px]">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Book Keeping Submission
        </h1>
        <nav
          className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="text-zinc-600 underline hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            Home
          </Link>
          {" / "}
          <span>Book Keeping</span>
          {" / "}
          <span className="text-zinc-900 dark:text-zinc-50">Submission</span>
        </nav>

        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          {readOnly && (
            <div
              className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200"
              role="status"
              aria-live="polite"
            >
              <p className="font-semibold">Submission successful</p>
              <p className="mt-1 text-sm">
                Your book keeping data has been submitted. All fields are now read-only.
              </p>
            </div>
          )}
          <SubmissionForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={readOnly}
          />

          {!readOnly && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#6B7280" }}
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={handleSubmitClick}
                disabled={submitDisabled}
                aria-disabled={submitDisabled}
                className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: "#2563EB" }}
              >
                Submit
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Modal opens only when validation passes (no errors); Submit button is disabled until then. */}
      <ConfirmSubmitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </div>
  );
}
