"use client";

import DashNav from "./dash-nav";
import { ProjectListClient } from "./project-list";

const Page = () => {
  return (
    <div>
      <div className=" ">
        <DashNav />

        <ProjectListClient />
      </div>
    </div>
  );
};

export default Page;
