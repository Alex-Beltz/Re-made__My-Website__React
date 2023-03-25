// import React, { useState, useEffect } from "react";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import { fetchWorldMap } from "./api";
// import "../styles/TimeZoneCalculator.css";

// const TimeZoneCalculator = () => {
//   const [selectedZone1, setSelectedZone1] = useState("");
//   const [selectedZone2, setSelectedZone2] = useState("");
//   const [timeDifference, setTimeDifference] = useState("");
//   const [worldMap, setWorldMap] = useState("");

//   useEffect(() => {
//     async function fetchMap() {
//       const map = await fetchWorldMap();
//       setWorldMap(map);
//     }

//     fetchMap();
//   }, []);

//   const handleZoneClick = (zone) => {
//     if (!selectedZone1) {
//       setSelectedZone1(zone);
//     } else if (!selectedZone2) {
//       setSelectedZone2(zone);
//       calculateTimeDifference(selectedZone1, zone);
//     } else {
//       setSelectedZone1(zone);
//       setSelectedZone2("");
//       setTimeDifference("");
//     }
//   };

//   const calculateTimeDifference = (zone1, zone2) => {
//     // Perform timezone calculation logic here and set the result to the `timeDifference` state
//     setTimeDifference("12 hours ahead");
//   };

//   return (
//     <div className="timezone-calculator">
//       <div className="map-container">
//         {worldMap && (
//           <ComposableMap>
//             <Geographies geography={JSON.parse(worldMap)}>
//               {({ geographies }) =>
//                 geographies.map((geo) => (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     fill="#D6D6DA"
//                     stroke="#FFFFFF"
//                     onClick={() => handleZoneClick(geo.properties.time_zone)}
//                   />
//                 ))
//               }
//             </Geographies>
//           </ComposableMap>
//         )}
//       </div>
//       <div className="selected-timezones">
//         <h1>{selectedZone1}</h1>
//         <h1>{selectedZone2}</h1>
//       </div>
//       <div className="time-difference">
//         <h2>{timeDifference}</h2>
//       </div>
//     </div>
//   );
// };

// export default TimeZoneCalculator;

// import React, { useState, useEffect } from "react";
// // import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// // import { fetchWorldMap } from "./api";
// import "../styles/TimeZoneCalculator.css";

// const TimeZoneCalculator = () => {
//   const [selectedZone1, setSelectedZone1] = useState("");
//   const [selectedZone2, setSelectedZone2] = useState("");
//   const [timeDifference, setTimeDifference] = useState("");
//   const [worldMap, setWorldMap] = useState("");
//   const [timezone1, setTimezone1] = useState("");
//   const [timezone2, setTimezone2] = useState("");
//   const [timeInput, setTimeInput] = useState("");
//   const [isAM, setIsAM] = useState(true);
//   const [isPM, setIsPM] = useState(false);

//   useEffect(() => {
//     async function fetchMap() {
//       const map = await fetchWorldMap();
//       setWorldMap(map);
//     }

//     fetchMap();
//   }, []);

//   const handleZoneClick = (zone) => {
//     if (!selectedZone1) {
//       setSelectedZone1(zone);
//       setTimezone1(zone);
//     } else if (!selectedZone2) {
//       setSelectedZone2(zone);
//       setTimezone2(zone);
//       calculateTimeDifference(timezone1, zone);
//     } else {
//       setSelectedZone1(zone);
//       setSelectedZone2("");
//       setTimeDifference("");
//     }
//   };

//   const calculateTimeDifference = (zone1, zone2) => {
//     const date = new Date();
//     const time1 = date.toLocaleString("en-US", { timeZone: zone1 });
//     const time2 = date.toLocaleString("en-US", { timeZone: zone2 });

//     const time1Date = new Date(time1);
//     const time2Date = new Date(time2);

//     const timeDiff = time2Date.getTime() - time1Date.getTime();

//     const time1String = `${time1Date.getHours()}:${time1Date.getMinutes()}`;
//     const time2String = `${time2Date.getHours()}:${time2Date.getMinutes()}`;

//     setTimeDifference(
//       `When it is ${time1String} in ${zone1}, it is ${time2String} in ${zone2}.`
//     );
//   };

//   const handleTimeInput = (event) => {
//     const timeRegex = /^(1[0-2]|0?[1-9]):([0-5][0-9])$/;
//     const time = event.target.value;
//     if (timeRegex.test(time)) {
//       setTimeInput(time);
//     }
//   };

//   const handleAMChange = (event) => {
//     setIsAM(event.target.checked);
//     setIsPM(!event.target.checked);
//   };

//   const handlePMChange = (event) => {
//     setIsPM(event.target.checked);
//     setIsAM(!event.target.checked);
//   };

//   return (
//     <div className="timezone-calculator">
//       <div className="map-container">
//         {worldMap && (
//           <ComposableMap>
//             <Geographies geography={JSON.parse(worldMap)}>
//               {({ geographies }) =>
//                 geographies.map((geo) => (
//                   <Geography
//                     key={geo.rsmKey}
//                     geography={geo}
//                     fill="#D6D6DA"
//                     stroke="#FFFFFF"
//                     onClick={() => handleZoneClick(geo.properties.time_zone)}
//                   />
//                 ))
//               }
//             </Geographies>
//           </ComposableMap>
//         )}
//       </div>
//       <div className="selected-timezones">
//         <h1>{selectedZone1}</h1>
//         <h1>{selectedZone2}</h1>
//       </div>
//       <div className="time-difference">
//         <h2>{timeDifference}</h2>
//       </div>
//       <div className="timezone-selection">
//         <select
//           value={timezone1}
//           onChange={(event) => setTimezone1(event.target.value)}
//         >
//           <option value="" disabled>
//             Select Timezone 1
//           </option>
//           {Intl.DateTimeFormat()
//             .resolvedOptions()
//             .timeZone.map((timezone) => (
//               <option key={timezone} value={timezone}>
//                 {timezone}
//               </option>
//             ))}
//         </select>
//         <select
//           value={timezone2}
//           onChange={(event) => {
//             setTimezone2(event.target.value);
//             calculateTimeDifference(timezone1, event.target.value);
//           }}
//         >
//           <option value="" disabled>
//             Select Timezone 2
//           </option>
//           {Intl.DateTimeFormat()
//             .resolvedOptions()
//             .timeZone.map((timezone) => (
//               <option key={timezone} value={timezone}>
//                 {timezone}
//               </option>
//             ))}
//         </select>
//         <div className="time-input">
//           <input
//             type="text"
//             value={timeInput}
//             onChange={handleTimeInput}
//             placeholder="Enter Time"
//           />
//           <div className="checkboxes">
//             <label htmlFor="am">
//               <input
//                 type="checkbox"
//                 id="am"
//                 checked={isAM}
//                 onChange={handleAMChange}
//               />
//               AM
//             </label>
//             <label htmlFor="pm">
//               <input
//                 type="checkbox"
//                 id="pm"
//                 checked={isPM}
//                 onChange={handlePMChange}
//               />
//               PM
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeZoneCalculator;
