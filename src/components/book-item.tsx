import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`}>
      <div className={style.container}>
        <Image
          src={coverImgUrl}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "80px", height: "auto" }}
          alt={`도서 ${title}의 표지 이미지`}
          priority
        />
        <div>
          <div className={style.title}>{title}</div>
          <div className={style.subTitle}>{subTitle}</div>
          <br />
          <div className={style.author}>
            {author} | {publisher}
          </div>
        </div>
      </div>
    </Link>
  );
}
