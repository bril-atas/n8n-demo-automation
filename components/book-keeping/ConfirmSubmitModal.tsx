"use client";

export interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmSubmitModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmSubmitModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-submit-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-submit-title"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Confirm Submit
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Are you sure you want to submit this book keeping data?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            style={{ backgroundColor: "#6B7280", color: "#fff" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#2563EB" }}
          >
            Confirm Submit
          </button>
        </div>
      </div>
    </div>
  );
}
