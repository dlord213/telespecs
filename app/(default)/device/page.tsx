"use client";

import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import fetchDeviceSpecifications from "@/utils/fetchDeviceSpecifications";
import client_instance from "@/app/lib/client";
import { MdAddComment } from "react-icons/md";
import { ListResult, RecordModel } from "pocketbase";

export default function Page() {
  const searchParams = useSearchParams();
  const deviceLink = searchParams.get("device");
  const [index, setIndex] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosenFiles = event.target.files;
    if (chosenFiles) {
      setFiles(Array.from(chosenFiles));
    }
  };

  const { data: deviceSpecificationsData, isFetching } = useQuery({
    queryKey: [deviceLink, "device"],
    queryFn: () => fetchDeviceSpecifications(deviceLink!),
  });

  const {
    data: reviewsData,
    isFetching: isReviewsFetching,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: [deviceLink, "reviews"],
    queryFn: async (): Promise<ListResult<RecordModel>> => {
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
        throw err;
      }
    },
  });

  const postReviewMutation = useMutation({
    mutationFn: async () => {
      try {
        const record = await client_instance.collection("review").create({
          device_id: deviceLink,
          user: client_instance.authStore.model?.id,
          title: title,
          description: description,
          pictures: files,
        });

        return record;
      } catch (err) {
        return err;
      }
    },
    onMutate: () => {
      setIsPosting(true);
    },
    onSuccess: () => {
      setIsPosting(false);
      setTitle("");
      setDescription("");
      setFiles([]);
      setIsOpen(false);
      refetchReviews();
    },
    onError: () => {
      setIsPosting(false);
      alert("Failed to post review. Please try again.");
    },
  });

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    postReviewMutation.mutate();
  };

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
            {client_instance.authStore.isValid && (
              <>
                <div className="flex flex-row gap-2">
                  <button
                    className="flex flex-row gap-2 cursor-pointer p-2 text-red-50 bg-red-500 rounded-md"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <MdAddComment size={24} />
                    <p>Post a review</p>
                  </button>
                </div>
                {modalIsOpen && (
                  <form
                    className="flex flex-col gap-2"
                    onSubmit={handlePostSubmit}
                  >
                    <input
                      type="text"
                      name="title"
                      className="border rounded-md p-2"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <textarea
                      name="description"
                      rows={3}
                      className="border rounded-md p-2"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <div className="flex items-center justify-center w-full">
                      <label
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                          files.length > 0 ? "overflow-y-auto" : ""
                        }`}
                      >
                        {files.length === 0 ? (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG, or GIF (MAX. 800x400px)
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2 p-2">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="w-20 h-20 border rounded-md p-2 bg-white shadow"
                              >
                                {file.type.startsWith("image/") ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                ) : (
                                  <span className="text-xs text-gray-700">
                                    {file.name}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={isPosting}
                      className="p-2 border bg-red-500 text-red-100 rounded-md hover:cursor-pointer"
                    >
                      {isPosting ? "Posting..." : "Post"}
                    </button>
                  </form>
                )}
              </>
            )}
            {reviewsData?.items?.length > 0 ? (
              reviewsData.items.map((review) => {
                const pictures = [];
                for (let i = 0; i < review.pictures.length; i++) {
                  const pictureURL = client_instance.files.getURL(
                    review,
                    review.pictures[i]
                  );
                  pictures.push(pictureURL);
                }

                return (
                  <section
                    className="flex flex-col gap-2 border rounded-md p-4 shadow"
                    key={review.id}
                  >
                    <div className="flex flex-row justify-between">
                      <p className="text-sm text-gray-400">
                        {review.expand!.user.name}
                      </p>
                      <p className="text-sm text-gray-400">{review.updated}</p>
                    </div>
                    <h1 className="text-xl font-bold">{review.title}</h1>
                    <p className="my-2">{review.description}</p>
                    <div className="flex flex-row gap-2 flex-wrap">
                      {pictures.map((e) => (
                        <img src={e} key={e} className="lg:max-w-[240px]" />
                      ))}
                    </div>
                  </section>
                );
              })
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
