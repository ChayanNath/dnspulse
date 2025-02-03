import { NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";
import {
  getResolverLocation,
  RESOLVER_LOCATIONS,
} from "@/lib/resolverLocations";

const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);
const resolveCname = promisify(dns.resolveCname);
const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);

async function queryDNS(domain: string, recordType: string, resolver: string) {
  dns.setServers([resolver]);

  switch (recordType) {
    case "A":
      const aRecords = await resolve4(domain);
      return aRecords.map((ip) => ({ resolver, ip, ttl: 0 }));
    case "AAAA":
      const aaaaRecords = await resolve6(domain);
      return aaaaRecords.map((ip) => ({ resolver, ip, ttl: 0 }));
    case "CNAME":
      const cnameRecords = await resolveCname(domain);
      return cnameRecords.map((cname) => ({ resolver, ip: cname, ttl: 0 }));
    case "MX":
      const mxRecords = await resolveMx(domain);
      return mxRecords.map((mx) => ({ resolver, ip: mx.exchange, ttl: 0 }));
    case "TXT":
      const txtRecords = await resolveTxt(domain);
      return txtRecords.flat().map((txt) => ({ resolver, ip: txt, ttl: 0 }));
    default:
      throw new Error("Unsupported record type");
  }
}

export async function POST(req: Request) {
  try {
    const { domain, recordType } = await req.json();

    if (!domain) {
      return NextResponse.json(
        { error: "Domain is required" },
        { status: 400 }
      );
    }
    const resolverDomains = Object.keys(RESOLVER_LOCATIONS);
    const results = [];
    for (const resolver of resolverDomains) {
      try {
        const resolverResults = await queryDNS(domain, recordType, resolver);
        const enrichedResults = resolverResults.map((result) => {
          const location = getResolverLocation(result.resolver);
          return {
            ...result,
            lat: location?.lat || 0,
            lon: location?.lon || 0,
          };
        });
        results.push(...enrichedResults);
      } catch (error) {
        console.error(`Error querying ${resolver}:`, error);
      }
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: "No DNS records found for the given domain and record type" },
        { status: 404 }
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("DNS resolution error:", error);
    return NextResponse.json(
      {
        error:
          "Failed to resolve DNS: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
