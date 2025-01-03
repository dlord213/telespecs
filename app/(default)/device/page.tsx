"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchDeviceSpecifications from "@/utils/fetchDeviceSpecifications";
import client_instance from "@/app/lib/client";

export default function Page() {
  const searchParams = useSearchParams();
  const deviceLink = searchParams.get("device");
  const [index, setIndex] = useState(0);

  const { data: deviceSpecificationsData, isFetching } = useQuery({
    queryKey: [deviceLink, "device"],
    queryFn: () => fetchDeviceSpecifications(deviceLink!),
  });

  const { data: reviewsData, isFetching: isReviewsFetching } = useQuery({
    queryKey: [deviceLink, "reviews"],
    queryFn: async () => {
      try {
        const reviews = await client_instance
          .collection("review")
          .getList(1, 50, {
            filter: `device_id = '${deviceLink?.toString()}'`,
            expand: "user, users",
          });

        console.log(reviews);

        return reviews;
      } catch (err) {
        return err;
      }
    },
  });

  const sections = [
    <>
      <div className="flex flex-col gap-2 m-2 lg:basis-[70%] lg:p-8 lg:m-0">
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Network</h1>
          <div className="grid grid-cols-2">
            <p>Technology</p>
            <p>{deviceSpecificationsData?.network.technology}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Launch</h1>
          <div className="grid grid-cols-2">
            <p>Announced</p>
            <p>{deviceSpecificationsData?.launch.announced}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Status</p>
            <p>{deviceSpecificationsData?.launch.status}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Body</h1>
          <div className="grid grid-cols-2">
            <p>Dimensions</p>
            <p>{deviceSpecificationsData?.body.dimensions}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Build</p>
            <p>{deviceSpecificationsData?.body.build}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Weight</p>
            <p>{deviceSpecificationsData?.body.weight}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>SIM</p>
            <p>{deviceSpecificationsData?.body.SIM}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Display</h1>
          <div className="grid grid-cols-2">
            <p>Type</p>
            <p>{deviceSpecificationsData?.display.type}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Size</p>
            <p>{deviceSpecificationsData?.display.size}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Resolution</p>
            <p>{deviceSpecificationsData?.display.resolution}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Protection</p>
            <p>{deviceSpecificationsData?.display.protection}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Platform</h1>
          <div className="grid grid-cols-2">
            <p>Chipset</p>
            <p>{deviceSpecificationsData?.platform.chipset}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Operating System</p>
            <p>{deviceSpecificationsData?.platform.OS}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>CPU</p>
            <p>{deviceSpecificationsData?.platform.CPU}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>GPU</p>
            <p>{deviceSpecificationsData?.platform.GPU}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Memory</h1>
          <div className="grid grid-cols-2">
            <p>Card Slot</p>
            <p>{deviceSpecificationsData?.memory.card_slot}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Internal</p>
            <p>{deviceSpecificationsData?.memory.internal}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Battery</h1>
          <div className="grid grid-cols-2">
            <p>Type</p>
            <p>{deviceSpecificationsData?.battery.type}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Charging</p>
            <p>{deviceSpecificationsData?.battery.charging.toString()}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Memory</h1>
          <div className="grid grid-cols-2">
            <p>Wi-Fi</p>
            <p>{deviceSpecificationsData?.communications.wlan}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Bluetooth</p>
            <p>{deviceSpecificationsData?.communications.bluetooth}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Radio</p>
            <p>{deviceSpecificationsData?.communications.radio}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>USB</p>
            <p>{deviceSpecificationsData?.communications.usb}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Infrared</p>
            <p>{deviceSpecificationsData?.communications.infrared_port}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Positioning</p>
            <p>{deviceSpecificationsData?.communications.positioning}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Features</h1>
          <p>{deviceSpecificationsData?.features}</p>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4 shadow">
          <h1 className="lg:text-2xl text-red-500 font-bold">Misc</h1>
          <div className="grid grid-cols-2">
            <p>Colors</p>
            <p>{deviceSpecificationsData?.misc.colors}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Price</p>
            <p>{deviceSpecificationsData?.misc.price}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>Models</p>
            <p>{deviceSpecificationsData?.misc.models}</p>
          </div>
        </section>
      </div>
    </>,
    <>
      <div className="lg:flex lg:flex-col lg:basis-[70%] lg:flex-wrap lg:gap-8 lg:p-8 2xl:grid 2xl:grid-cols-2 2xl:place-items-center">
        {deviceSpecificationsData?.pictures.map((src) => (
          <img
            src={src}
            className="lg:max-w-[320px] xl:max-w-[600px] w-full rounded-md transition-all delay-0 duration-300 hover:scale-105"
            key={src}
          />
        ))}
      </div>
    </>,
    <>
      {reviewsData! ? (
        <>
          <div className="flex flex-col gap-2 m-2 lg:basis-[70%] lg:p-8 lg:m-0">
            {client_instance.authStore.isValid ? (
              <div className="flex flex-row gap-2">
                <button
                  type="submit"
                  className="cursor-pointer p-2 text-red-50 bg-red-500 rounded-md"
                >
                  Post a review
                </button>
              </div>
            ) : null}
            {reviewsData!.items ? (
              reviewsData.items.map((review) => (
                <section
                  className="flex flex-col gap-2 border rounded-md p-4 shadow"
                  key={review.id}
                >
                  <div className="flex flex-row justify-between">
                    <p className="text-sm text-gray-400">
                      {review.expand.user.name}
                    </p>
                    <p className="text-sm text-gray-400">{review.updated}</p>
                  </div>
                  <h1 className="text-xl font-bold">{review.title}</h1>
                  <p className="my-2">{review.description}</p>
                </section>
              ))
            ) : (
              <h1>No reviews yet.</h1>
            )}
          </div>
        </>
      ) : null}
    </>,
  ];

  if (isFetching) {
    return (
      <main className="flex flex-col lg:flex-row lg:gap-8">
        <div className="hidden lg:sticky lg:top-0 lg:flex flex-col gap-4 lg:basis-[30%] lg:p-8 lg:h-full"></div>
        <div className="sticky top-0 flex flex-col gap-4 lg:basis-[70%] lg:p-8 h-full p-4"></div>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-2 lg:flex-row lg:gap-8">
      <div className="lg:sticky lg:top-16 p-4 flex flex-col justify-center lg:justify-start items-center lg:items-start lg:gap-4 2xl:gap-8 lg:basis-[30%] lg:p-8 h-full">
        <img
          src={deviceSpecificationsData?.pictures[0]}
          className="max-w-[144px] lg:max-w-[240px] 2xl:max-w-[768px] w-full"
        />
        <h1 className="font-black lg:text-4xl 2xl:text-5xl">
          {deviceSpecificationsData?.heading.model}
        </h1>
        <ul className="flex flex-col list-none gap-4">
          <button
            className="flex flex-row gap-4 text-left transition-all duration-200 delay-0 hover:text-red-500 2xl:text-xl"
            onClick={() => setIndex(0)}
          >
            <span
              className="transition-all delay-0 duration-300 -z-50"
              style={{
                scale: index == 0 ? 3 : 1,
                color: index == 0 ? "#ef4444" : "initial",
              }}
            >
              •
            </span>
            Specifications
          </button>
          <button
            className="flex flex-row gap-4 text-left transition-all duration-200 delay-0 hover:text-red-500 2xl:text-xl"
            onClick={() => setIndex(1)}
            style={{
              display: deviceSpecificationsData?.links.pictures
                ? "flex"
                : "none",
            }}
          >
            <span
              className="transition-all delay-0 duration-300 -z-50"
              style={{
                scale: index == 1 ? 3 : 1,
                color: index == 1 ? "#ef4444" : "initial",
              }}
            >
              •
            </span>
            Pictures
          </button>
          <button
            className="flex flex-row gap-4 text-left transition-all duration-200 delay-0 hover:text-red-500 2xl:text-xl"
            onClick={() => {
              if (!isReviewsFetching) {
                setIndex(2);
              }
            }}
          >
            <span
              className="transition-all delay-0 duration-300 -z-50"
              style={{
                scale: index == 2 ? 3 : 1,
                color: index == 2 ? "#ef4444" : "initial",
              }}
            >
              •
            </span>
            Reviews
          </button>
        </ul>
      </div>
      {sections[index]}
    </main>
  );
}
