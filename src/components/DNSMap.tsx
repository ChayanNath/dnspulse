import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { DNSResult } from "@/app/page";
const DNSMap = ({ dnsResults }: { dnsResults: DNSResult[] }) => {
  return (
    <ComposableMap projectionConfig={{ scale: 150 }}>
      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#DDD"
              stroke="#FFF"
            />
          ))
        }
      </Geographies>
      {dnsResults.map((result, index) => (
        <Marker key={index} coordinates={[result.lon, result.lat]}>
          <circle r={5} fill="#F00" />
          <title>
            Resolver: {result.resolver} &nbsp;IP: {result.ip} &nbsp;TTL:{" "}
            {result.ttl}
          </title>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default DNSMap;
