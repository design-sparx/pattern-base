import Image from "next/image";
import Link from "next/link";

export function Logo({
  size = 22,
  href = "/",
  alt = "PatternBase",
}: {
  size?: number;
  href?: string;
  alt?: string;
}) {
  return (
    <Link href={href} aria-label={`${alt} home`} className="flex items-center">
      <Image
        src="/logo.png"
        alt={alt}
        width={size}
        height={size}
        aria-hidden="true"
      />
    </Link>
  );
}
