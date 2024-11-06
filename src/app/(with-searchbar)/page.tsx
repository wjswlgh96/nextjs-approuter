import BookItem from "@/components/book-item";
import styles from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/utils/delay";
import { Suspense } from "react";

// export const dynamic = "";
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정함
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static: 페이지를 강제로 Static 페이지로 설정
// 4. error

async function AllBooks() {
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/random`,
    {
      next: { revalidate: 5 },
    }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중입니다...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
