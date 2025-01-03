import axios from "axios";
import * as cheerio from "cheerio";

interface DeviceProps {
  links: {
    pictures: string | undefined;
  };
  heading: {
    model: string;
    image: string | undefined;
    release_date: string;
    android_ver: string;
    storage: string;
    display: { inch: string; pixels: string };
    camera: { mp: string; resolution: string };
    chipset: { ram: string; cpu: string };
    battery: { capacity: string; charging_rate: string };
  };
  network: { technology: string };
  launch: { announced: string; status: string };
  body: { dimensions: string; weight: string; build: string; SIM: string };
  display: {
    type: string;
    size: string;
    resolution: string;
    protection: string;
  };
  platform: { OS: string; chipset: string; CPU: string; GPU: string };
  memory: { card_slot: string; internal: string };
  main_camera: { cameras: string[]; features: string; video: string };
  selfie_camera: { camera: string; features: string; video: string };
  sound: { speaker: string; jack: string; misc: string[] };
  communications: {
    wlan: string;
    bluetooth: string;
    positioning: string;
    NFC: string;
    infrared_port: string;
    radio: string;
    usb: string;
  };
  features: string;
  battery: { type: string; charging: string[] };
  misc: { colors: string; models: string; SAR: string; price: string };
  tests: {
    performance: string[];
    display: string;
    camera: string;
    loudspeaker: string;
  };
  pictures: string[];
}

const fetchDeviceSpecifications = async (deviceLink: string | undefined) => {
  if (!deviceLink) throw new Error("Device link is required.");

  const url =
    "https://api.allorigins.win/get?url=" +
    encodeURIComponent(
      "https://www.gsmarena.com/" + deviceLink.replace(".php", "") + ".php"
    );

  const { data } = await axios.get(url);
  if (!data.contents) throw new Error("Failed to fetch page content.");

  const $ = cheerio.load(data.contents);

  const device: DeviceProps = {
    links: {
      pictures: $(".article-info-meta a:contains('Pictures')").attr("href"),
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
    network: { technology: "" },
    launch: { announced: "", status: "" },
    body: { dimensions: "", weight: "", build: "", SIM: "" },
    display: { type: "", size: "", resolution: "", protection: "" },
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
            if (label === "Features") device.selfie_camera.features = value;
            if (label === "Video") device.selfie_camera.video = value;
            else device.selfie_camera.camera = value;
            break;
          case "sound":
            if (label === "Loudspeaker") device.sound.speaker = value;
            if (label === "3.5mm jack") device.sound.jack = value;
            break;
          case "comms":
            if (label === "WLAN") device.communications.wlan = value;
            if (label === "Bluetooth") device.communications.bluetooth = value;
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
            if (label === "Performance") device.tests.performance.push(value);
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
      encodeURIComponent("https://www.gsmarena.com/" + device.links.pictures);

    const { data: htmlResponse } = await axios.get(picturesUrl);
    const $ = cheerio.load(htmlResponse.contents);

    const imgSrcs: string[] = [];
    $("#pictures-list img").each((index, element) => {
      const src = $(element).attr("src");
      if (src) {
        imgSrcs.push(src);
      }
    });
    device.pictures = imgSrcs;
  }

  return device;
};

export default fetchDeviceSpecifications;
