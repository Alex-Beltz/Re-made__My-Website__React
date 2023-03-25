import React from "react";
import "../styles/WorkHistory.css";

export default function WorkHistory() {
  return (
    <div className="WorkExperienceCont">
      <div className="ExperinceCategoryCont">
        <div className="WorkExperienceImg">
          <img src="image-url" alt="Network Field Engineer" />
        </div>
        <div className="WorkExperienceDescription">
          <h2>Network Field Engineer</h2>
          <p>
            I have been working as a Network Field Engineer since 2004, with
            experience in various types of network infrastructure. From small
            businesses to datacenters, I have worked on projects for some of the
            largest carriers and ISPs such as Google, Facebook, Bell Canada,
            Verizon, AT&T, T-Mobile, Wave BB, and government agencies such as
            FEMA. My experience includes working with a variety of equipment
            such as Cisco, Ciena, Infinera, Juniper, Adva, Fortinet, Aruba
            Network, and fiber technologies such as Single-mode fiber (SMF),
            Multimode fiber (MMF), Fiber to the Home (FTTH), Passive Optical
            Network (PON), Dense Wavelength Division Multiplexing (DWDM), Coarse
            Wavelength Division Multiplexing (CWDM), Optical Transport Network
            (OTN), Fiber Channel (FC), Ethernet over Fiber (EoF), and some
            SONET/SDH.
          </p>
          <p>
            I have also worked on structured cabling projects for large
            commercial chains including Home Depot, Lowes, Walmart, Target,
            Starbucks, and many others. These projects include full new builds,
            troubleshooting, maintaining, and adding/changing Point-of-Sale
            systems (POS), security camera systems (CCTV), speaker and
            amplifiers, Wireless Access Points (WAP), and all other networked
            equipment types. From 2013-2014 I worked onsite in most the Boeing
            facilities in Western, Washingtion, maintaining, adding, moving, and
            troubleshooting the span of network technologies and equipment.
          </p>
        </div>
      </div>
      <div className="ExperinceCategoryCont">
        <div className="WorkExperienceDescription">
          <h2>Commercial Fisherman</h2>
          <p>
            From 2004 to 2012, I worked as a deep sea catcher processor in the
            Bering Sea for US Seafoods, fishing for cod, black cod, pollock,
            mackerel, and many other species. I later worked for Captain Paul
            Hill on the F/V Dalena based in Bellingham, Washington, fishing in
            the North and South Pacific for Albacore Tuna from 2006 to 2012. In
            2018, I worked for Captain Paul Hill again on the F/V Betty H. based
            in Honolulu, Hawaii, fishing in the North Pacific for Albacore Tuna.
          </p>
        </div>
        <div className="WorkExperienceImg">
          <img src="image-url" alt="Commercial Fisherman" />
        </div>
      </div>
    </div>
  );
}
