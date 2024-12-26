import Link from "next/link";

interface ProductCardProps {
  link: string;
  imageSrc: string | undefined;
  product_title: string;
}

export default function ProductCard({
  link,
  imageSrc,
  product_title,
}: ProductCardProps) {
  return (
    <Link
      href={{ pathname: "/device", query: { device: link } }}
      className="flex flex-col gap-3 items-center transition-all delay-0 duration-500 hover:scale-105 text-center"
    >
      <img src={imageSrc} className="w-full xl:max-w-[128px]" />
      <h1>{product_title}</h1>
    </Link>
  );
}
