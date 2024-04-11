"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  // Маршрутизация
  const { push } = useRouter();

  // Так как у нас как таковой главной нет - редиректим с нее на расписание
  useEffect(() => {
    push("/shedule");
  }, []);

  // Это чтобы ошибок не было
  return <p></p>;
};

export default Home;
