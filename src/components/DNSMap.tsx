import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { DNSResult } from "./DNSChecker";

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
      {dnsResults.map((result, index) => {
        const isSuccessful = result.ip && result.ip !== "";
        return (
          <Marker key={index} coordinates={[result.lon, result.lat]}>
            <circle
              r={6}
              fill={isSuccessful ? "#0F0" : "#F00"} // Green for success, Red for failure
              stroke="#000"
              strokeWidth={0.5}
            />
            <title>
              Resolver: {result.resolver}{" "}
              {isSuccessful
                ? `| IP: ${result.ip} | TTL: ${result.ttl}`
                : "| Resolution Failed"}
            </title>
          </Marker>
        );
      })}
    </ComposableMap>
  );
};

export default DNSMap;
