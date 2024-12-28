"use client";

import fetchDevicesByRanking from "@/utils/fetchDevicesByRanking";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  MdDevices,
  MdBrandingWatermark,
  MdLabelImportant,
} from "react-icons/md";

export default function Sidebar() {
  const { data, error, isFetching } = useQuery({
    queryFn: fetchDevicesByRanking,
    queryKey: ["ranking"],
  });

  return (
    <div className="hidden lg:flex lg:flex-col gap-4 border-r xl:basis-[20%] 2xl:basis-[15%]">
      <ul className="flex flex-col gap-4 list-none p-4">
        <Link
          className="flex flex-row gap-4 items-center transition-all delay-0 duration-200 hover:text-red-600"
          href="/"
        >
          <MdDevices />
          <p>Devices</p>
        </Link>
        <Link
          className="flex flex-row gap-4 items-center transition-all delay-0 duration-200 hover:text-red-600"
          href="/rumor
          "
        >
          <MdLabelImportant />
          <p>Upcoming/Rumors</p>
        </Link>
      </ul>
    </div>
  );
}
