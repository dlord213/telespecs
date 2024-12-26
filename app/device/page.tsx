"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";
import ContentLoader from "react-content-loader";

export default function Page() {
  const searchParams = useSearchParams();
  const deviceLink = searchParams.get("device");
  const [index, setIndex] = useState(0);

  const { data: deviceSpecificationsData, isFetching } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
              "https://www.gsmarena.com/" +
                deviceLink?.replace(".php", "") +
                ".php"
            )
        );

        if (!data.contents) throw new Error("Failed to fetch page content.");

        const $ = cheerio.load(data.contents);

        const device = {
          links: {
            pictures: $(".article-info-meta a:contains('Pictures')").attr(
              "href"
            ),
          },
          heading: {
            model: $(".article-info .specs-phone-name-title").text().trim(),
            image: $(".specs-photo-main img").attr("src"),
            release_date: "",
            android_ver: "",
            storage: "",
            display: { inch: "", pixels: "" },
            camera: { mp: "", resolution: "" },
            chipset: { ram: "", cpu: "" },
            battery: { capacity: "", charging_rate: "" },
          },
          network: {
            technology: "",
          },
          launch: { announced: "", status: "" },
          body: { dimensions: "", weight: "", build: "", SIM: "" },
          display: {
            type: "",
            size: "",
            resolution: "",
            protection: "",
          },
          platform: { OS: "", chipset: "", CPU: "", GPU: "" },
          memory: { card_slot: "", internal: "" },
          main_camera: { cameras: [], features: "", video: "" },
          selfie_camera: { camera: "", features: "", video: "" },
          sound: { speaker: "", jack: "", misc: [] },
          communications: {
            wlan: "",
            bluetooth: "",
            positioning: "",
            NFC: "",
            infrared_port: "",
            radio: "",
            usb: "",
          },
          features: "",
          battery: { type: "", charging: [] },
          misc: { colors: "", models: "", SAR: "", price: "" },
          tests: { performance: [], display: "", camera: "", loudspeaker: "" },
          pictures: [],
        };

        $("#specs-list > table").each((index, table) => {
          const sectionTitle = $(table)
            .find("th")
            .first()
            .text()
            .trim()
            .toLowerCase();
          $(table)
            .find("tr")
            .each((i, row) => {
              const label = $(row).find("td.ttl").text().trim();
              const value = $(row).find("td.nfo").text().trim();

              switch (sectionTitle) {
                case "network":
                  if (label === "Technology") device.network.technology = value;
                  break;
                case "launch":
                  if (label === "Announced") device.launch.announced = value;
                  if (label === "Status") device.launch.status = value;
                  break;
                case "body":
                  if (label === "Dimensions") device.body.dimensions = value;
                  if (label === "Weight") device.body.weight = value;
                  if (label === "Build") device.body.build = value;
                  if (label === "SIM") device.body.SIM = value;
                  break;
                case "display":
                  if (label === "Type") device.display.type = value;
                  if (label === "Size") device.display.size = value;
                  if (label === "Resolution") device.display.resolution = value;
                  if (label === "Protection") device.display.protection = value;
                  break;
                case "platform":
                  if (label === "OS") device.platform.OS = value;
                  if (label === "Chipset") device.platform.chipset = value;
                  if (label === "CPU") device.platform.CPU = value;
                  if (label === "GPU") device.platform.GPU = value;
                  break;
                case "memory":
                  if (label === "Card slot") device.memory.card_slot = value;
                  if (label === "Internal") device.memory.internal = value;
                  break;
                case "main camera":
                  if (label === "Features") device.main_camera.features = value;
                  if (label === "Video") device.main_camera.video = value;
                  else device.main_camera.cameras.push(value);
                  break;
                case "selfie camera":
                  if (label === "Features")
                    device.selfie_camera.features = value;
                  if (label === "Video") device.selfie_camera.video = value;
                  else device.selfie_camera.camera = value;
                  break;
                case "sound":
                  if (label === "Loudspeaker") device.sound.speaker = value;
                  if (label === "3.5mm jack") device.sound.jack = value;
                  break;
                case "comms":
                  if (label === "WLAN") device.communications.wlan = value;
                  if (label === "Bluetooth")
                    device.communications.bluetooth = value;
                  if (label === "Positioning")
                    device.communications.positioning = value;
                  if (label === "NFC") device.communications.NFC = value;
                  if (label === "Infrared port")
                    device.communications.infrared_port = value;
                  if (label === "Radio") device.communications.radio = value;
                  if (label === "USB") device.communications.usb = value;
                  break;
                case "features":
                  device.features = value;
                  break;
                case "battery":
                  if (label === "Type") device.battery.type = value;
                  else device.battery.charging.push(value);
                  break;
                case "misc":
                  if (label === "Colors") device.misc.colors = value;
                  if (label === "Models") device.misc.models = value;
                  if (label === "SAR") device.misc.SAR = value;
                  if (label === "Price") device.misc.price = value;
                  break;
                case "tests":
                  if (label === "Performance")
                    device.tests.performance.push(value);
                  if (label === "Display") device.tests.display = value;
                  if (label === "Camera") device.tests.camera = value;
                  if (label === "Loudspeaker") device.tests.loudspeaker = value;
                  break;
              }
            });
        });

        if (device.links.pictures) {
          const picturesUrl =
            "https://api.allorigins.win/get?url=" +
            encodeURIComponent(
              "https://www.gsmarena.com/" + device.links.pictures
            );

          const { data: htmlResponse } = await axios.get(picturesUrl);
          const $ = cheerio.load(htmlResponse.contents);

          console.log(picturesUrl);

          const imgSrcs: string[] = [];
          $("#pictures-list img").each((index, element) => {
            const src = $(element).attr("src");
            if (src) {
              imgSrcs.push(src);
            }
          });
          device.pictures = imgSrcs;

          console.log("Official Images:", device.pictures);
        }

        console.log(device);
        return device;
      } catch (err) {
        throw err;
      }
    },
    queryKey: [deviceLink, "device"],
  });

  const sections = [
    <>
      <div className="flex flex-col gap-2 lg:basis-[70%] lg:p-8">
        <section className="flex flex-col gap-2 border rounded-md p-4">
          <h1 className="lg:text-2xl text-red-500 font-bold">Network</h1>
          <div className="grid grid-cols-2">
            <p>Technology</p>
            <p>{deviceSpecificationsData?.network.technology}</p>
          </div>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
        <section className="flex flex-col gap-2 border rounded-md p-4">
          <h1 className="lg:text-2xl text-red-500 font-bold">Features</h1>
          <p>{deviceSpecificationsData?.features}</p>
        </section>
        <section className="flex flex-col gap-2 border rounded-md p-4">
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
      <div className="grid grid-cols-3 content-start gap-4 lg:p-8">
        {deviceSpecificationsData?.pictures.map((src) => (
          <img
            src={src}
            className="max-w-[320px] w-full rounded-md transition-all delay-0 duration-300 hover:scale-105"
            key={src}
          />
        ))}
      </div>
    </>,
  ];

  if (!deviceSpecificationsData) {
    return (
      <main className="flex lg:flex-row lg:gap-8">
        <div className="sticky top-0 flex flex-col gap-4 lg:basis-[30%] lg:p-8 h-full">
          <ContentLoader viewBox="0 0 340 84">
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
          </ContentLoader>
        </div>
        <div className="sticky top-0 flex flex-col gap-4 lg:basis-[70%] lg:p-8 h-full">
          <ContentLoader viewBox="0 0 340 84">
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
            <rect x="0" y="0" width="67" height="11" rx="3" />
            <rect x="76" y="0" width="140" height="11" rx="3" />
            <rect x="127" y="48" width="53" height="11" rx="3" />
            <rect x="187" y="48" width="72" height="11" rx="3" />
            <rect x="18" y="48" width="100" height="11" rx="3" />
            <rect x="0" y="71" width="37" height="11" rx="3" />
            <rect x="18" y="23" width="140" height="11" rx="3" />
            <rect x="166" y="23" width="173" height="11" rx="3" />
          </ContentLoader>
        </div>
      </main>
    );
  }

  return (
    <main className="flex lg:flex-row lg:gap-8">
      <div className="sticky top-0 flex flex-col gap-4 lg:basis-[30%] lg:p-8 h-full">
        <img
          src={deviceSpecificationsData?.heading.image}
          className="lg:max-w-[240px] w-full"
        />
        <h1 className="font-black lg:text-4xl">
          {deviceSpecificationsData?.heading.model}
        </h1>
        <ul className="flex flex-col list-none gap-4">
          <button
            className="flex flex-row gap-4 text-left transition-all duration-200 delay-0 hover:text-red-500"
            onClick={() => setIndex(0)}
          >
            <span
              className="transition-all delay-0 duration-300"
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
            className="flex flex-row gap-4 text-left transition-all duration-200 delay-0 hover:text-red-500"
            onClick={() => setIndex(1)}
            style={{
              display: deviceSpecificationsData?.links.pictures
                ? "flex"
                : "none",
            }}
          >
            <span
              className="transition-all delay-0 duration-300"
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
            className="flex flex-row gap-4 text-left transition-all duration-200 delay-0 hover:text-red-500"
            onClick={() => setIndex(2)}
          >
            <span
              className="transition-all delay-0 duration-300"
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
