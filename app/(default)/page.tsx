"use client";

import "swiper/css";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import fetchLatestPhonesData from "@/utils/fetchLatestPhonesData";

import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isFetching: isLatestPhonesDataFetching } = useQuery({
    queryFn: fetchLatestPhonesData,
    queryKey: ["latest"],
  });

  return (
    <main className="flex lg:flex-col min-h-screen">
      <div className="flex lg:flex-row gap-4 min-h-screen">
        <Sidebar />
        <div className="hidden lg:flex lg:flex-col gap-4 xl:basis-[80%] 2xl:basis-[70%] p-4">
          <section className="flex flex-col gap-8">
            <h1 className="font-bold xl:text-4xl">Latest devices</h1>
            {!isLatestPhonesDataFetching ? (
              <Swiper
                slidesPerView={data!.latestPhones?.length / 3}
                spaceBetween={20}
                className="xl:max-w-[70vw]"
              >
                {data?.latestPhones.map((phone) => (
                  <SwiperSlide key={phone.model} className="p-2">
                    <ProductCard
                      product_title={phone.model}
                      imageSrc={phone.image}
                      link={phone.link}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="min-h-[240px] max-w-[240px] max-h-[240px] min-w-[240px]" />
            )}
          </section>
          <section className="flex flex-col gap-8">
            <h1 className="font-bold xl:text-4xl">Phones in store right now</h1>
            {!isLatestPhonesDataFetching ? (
              <Swiper
                slidesPerView={data!.phonesInStore?.length / 3}
                spaceBetween={20}
                className="xl:max-w-[70vw]"
              >
                {data?.phonesInStore.map((phone) => (
                  <SwiperSlide key={phone.model} className="p-2">
                    <ProductCard
                      product_title={phone.model}
                      imageSrc={phone.image}
                      link={phone.link}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="min-h-[240px] max-w-[240px] max-h-[240px] min-w-[240px]" />
            )}
          </section>
        </div>
        <div className="flex flex-col lg:hidden p-4 gap-4 ">
          <section className="flex flex-col gap-8">
            <h1 className="text-2xl font-black">Latest devices</h1>
            <div className="grid grid-cols-2 gap-8">
              {data?.latestPhones.map((phone) => (
                <ProductCard
                  product_title={phone.model}
                  imageSrc={phone.image}
                  link={phone.link}
                  key={phone.link}
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-8">
            <h1 className="text-2xl font-black">Phones in store</h1>
            <div className="grid grid-cols-2 gap-8">
              {data?.phonesInStore.map((phone) => (
                <ProductCard
                  product_title={phone.model}
                  imageSrc={phone.image}
                  link={phone.link}
                  key={phone.link}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
