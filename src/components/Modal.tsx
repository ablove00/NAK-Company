/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";

type ModalProps = {
  isOpen: boolean;
  title?: React.ReactNode;              // متن/JSX بالای مودال
  children?: React.ReactNode;           // محتوای دلخواه (اختیاری)
  onClose: () => void;                  // وقتی مودال بسته می‌شود
  onConfirm?: () => void;               // وقتی Yes زده شد
  onCancel?: () => void;                // وقتی No زده شد
  yesLabel?: string;                    // متن دکمه تایید
  noLabel?: string;                     // متن دکمه لغو
  closeOnBackdropClick?: boolean;       // کلیک روی بک‌دراپ مودال را ببندد؟
};

const overlayStyle = css`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(14px);
  background: #00000005;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const modalStyle = css`
  width: 400px;
  border-radius: 40px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  padding: 20px;
  box-sizing: border-box;
  max-width: 90%;
  outline: none;
`;

const titleStyle = css`
  width: 326px;
  min-height: 80px;
  margin: 0 auto 16px;
  display: block;
  text-align: center;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  color: #000000;
`;

const buttonsWrapperStyle = css`
  display: flex;
  flex-direction: column; /* بالا و پایین (stacked) */
  gap: 12px;
  margin-top: 8px;
`;

const buttonBase = css`
  width: 100%;
  height: 40px;
  border-radius: 9999px;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial;
  font-weight: 600;
  font-size: 20px;
  line-height: 40px;
  cursor: pointer;
  box-sizing: border-box;
`;

const buttonSecondary = css`
  ${buttonBase};
  background: transparent;
  border: 1px solid #000000;
  color: #000000;
`;

const buttonPrimary = css`
  ${buttonBase};
  background: #c50000;
  border: 1px solid #c50000;
  color: #ffffff;
`;

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  onCancel,
  yesLabel = "Yes",
  noLabel = "No",
  closeOnBackdropClick = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // ذخیره عنصر قبلی برای برگرداندن فوکس بعد از بستن
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // فوکس روی مودال
    setTimeout(() => {
      modalRef.current?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        // simple focus trap
        const el = modalRef.current;
        if (!el) return;
        const focusable = Array.from(
          el.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter(Boolean);

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // جلوگیری از اسکرول پس‌زمینه (اختیاری)
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      // بازگرداندن فوکس
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onBackdropClick = (e: React.MouseEvent) => {
    if (!closeOnBackdropClick) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <div css={overlayStyle} onMouseDown={onBackdropClick} role="dialog" aria-modal="true">
      <div
        css={modalStyle}
        ref={modalRef}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span css={titleStyle}>{title}</span>

        <div>{children}</div>

        <div css={buttonsWrapperStyle}>
          <button css={buttonSecondary} onClick={handleCancel}>
            {noLabel}
          </button>
          <button css={buttonPrimary} onClick={handleConfirm}>
            {yesLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
