"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Facility photographs, with an enlarged view.
 *
 * Receives resolved image data from the server rather than asset keys, so the
 * image registry stays out of the browser bundle. Attribution travels with
 * each photograph into the enlarged view as well: a picture opened full-size
 * is the one most likely to be screenshotted and passed around without the
 * section it came from.
 *
 * The enlarged view is a native <dialog> opened with showModal(), which traps
 * focus, closes on Escape and returns focus to the thumbnail by itself.
 */

export type GalleryItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  blur?: string;
  caption: string;
  label: string;
};

export function FacilityGallery({ items, title }: { items: GalleryItem[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<GalleryItem | null>(null);

  const show = (item: GalleryItem) => {
    setOpen(item);
    dialog.current?.showModal();
  };

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-3" aria-label={title}>
        {items.map((item) => (
          <li key={item.src}>
            <figure>
              <button
                type="button"
                onClick={() => show(item)}
                className="group relative block aspect-[16/9] w-full overflow-hidden bg-ink/5"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  placeholder={item.blur ? "blur" : "empty"}
                  blurDataURL={item.blur}
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
                <span className="sr-only">, enlarge</span>
              </button>
              <figcaption className="mt-2 text-xs leading-snug text-ink/70">
                <span className="font-medium text-ink">{item.caption}</span>
                <span className="mx-1.5 opacity-50">·</span>
                {item.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        // A click on the backdrop lands on the dialog element itself.
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-label={open ? `${open.caption}, ${open.label}` : title}
        className="m-auto w-[min(1100px,94vw)] bg-paper p-0 text-ink backdrop:bg-ink/80 print:hidden"
      >
        {open && (
          <figure>
            <div className="relative w-full" style={{ aspectRatio: `${open.width} / ${open.height}`, maxHeight: "78vh" }}>
              <Image src={open.src} alt={open.alt} fill sizes="94vw" className="object-contain" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 p-4 text-sm">
              <span>
                <span className="font-medium">{open.caption}</span>
                <span className="mx-1.5 opacity-50">·</span>
                {open.label}
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => dialog.current?.close()}
                className="inline-flex min-h-11 items-center gap-1.5 border border-ink/25 px-3 font-medium"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Close
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
