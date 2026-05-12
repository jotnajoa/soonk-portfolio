// UpRightArrowIcon — replaces the unicode ↗ glyph site-wide.
//
// Why: ↗ (U+2197) is rendered by iOS as a chunky color emoji even when
// the surrounding text is monochrome editorial — looks like a bug on
// every external-link CTA in the case-study set.  Inline SVG path
// (source: assets/collections/right_arrow.svg) gives a clean,
// stroke-aligned glyph that inherits text color via currentColor for
// hover states.
//
// The asset is a horizontal right arrow (→), not the literal upper-right
// diagonal it replaces — Soonk's design call, prefers the cleaner shape.

export default function UpRightArrowIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      className={className}
    >
      <path d="M13.2686 3.66865C13.5686 3.3687 13.9755 3.2002 14.3998 3.2002C14.8241 3.2002 15.231 3.3687 15.531 3.66865L22.731 10.8687C23.031 11.1687 23.1995 11.5756 23.1995 11.9999C23.1995 12.4241 23.031 12.831 22.731 13.1311L15.531 20.3311C15.2292 20.6225 14.8251 20.7838 14.4056 20.7801C13.986 20.7765 13.5847 20.6082 13.2881 20.3116C12.9914 20.0149 12.8232 19.6136 12.8195 19.1941C12.8159 18.7746 12.9772 18.3704 13.2686 18.0687L17.5998 13.5999H2.3998C1.97546 13.5999 1.56849 13.4313 1.26843 13.1312C0.968376 12.8312 0.799805 12.4242 0.799805 11.9999C0.799805 11.5755 0.968376 11.1685 1.26843 10.8685C1.56849 10.5684 1.97546 10.3999 2.3998 10.3999H17.5998L13.2686 5.93105C12.9687 5.63101 12.8001 5.22412 12.8001 4.79985C12.8001 4.37559 12.9687 3.9687 13.2686 3.66865Z" />
    </svg>
  );
}
