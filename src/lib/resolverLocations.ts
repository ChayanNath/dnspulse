type ResolverLocation = { lat: number; lon: number };

export const RESOLVER_LOCATIONS: { [key: string]: ResolverLocation } = {
  // North America
  "8.8.8.8": { lat: 37.4056, lon: -122.0775 }, // Google DNS (US)
  "8.8.4.4": { lat: 37.4056, lon: -122.0775 }, // Google DNS (US)
  "1.1.1.1": { lat: 34.0522, lon: -118.2437 }, // Cloudflare DNS (US)
  "1.0.0.1": { lat: 34.0522, lon: -118.2437 }, // Cloudflare DNS (US)
  "208.67.222.222": { lat: 37.7749, lon: -122.4194 }, // OpenDNS (US)
  "208.67.220.220": { lat: 37.7749, lon: -122.4194 }, // OpenDNS (US)
  "9.9.9.9": { lat: 40.7128, lon: -74.006 }, // Quad9 DNS (US)
  "149.112.112.112": { lat: 40.7128, lon: -74.006 }, // Quad9 DNS (US)

  // Europe
  "84.200.69.80": { lat: 52.52, lon: 13.405 }, // DNS.Watch (Germany)
  "84.200.70.40": { lat: 52.52, lon: 13.405 }, // DNS.Watch (Germany)
  "185.228.168.9": { lat: 51.5074, lon: -0.1278 }, // CleanBrowsing DNS (UK)
  "185.228.169.9": { lat: 51.5074, lon: -0.1278 }, // CleanBrowsing DNS (UK)
  "176.103.130.130": { lat: 48.8566, lon: 2.3522 }, // AdGuard DNS (France)
  "176.103.130.131": { lat: 48.8566, lon: 2.3522 }, // AdGuard DNS (France)

  // Asia
  "203.112.2.4": { lat: 35.6895, lon: 139.6917 }, // NTT Communications (Japan)
  "203.112.2.5": { lat: 35.6895, lon: 139.6917 }, // NTT Communications (Japan)
  "101.101.101.101": { lat: 25.033, lon: 121.5654 }, // Quad101 (Taiwan)
  "101.102.103.104": { lat: 25.033, lon: 121.5654 }, // Quad101 (Taiwan)

  // South America
  "200.221.11.100": { lat: -23.5505, lon: -46.6333 }, // Terra DNS (Brazil)
  "200.221.11.101": { lat: -23.5505, lon: -46.6333 }, // Terra DNS (Brazil)

  // Africa
  "196.10.52.10": { lat: -26.2041, lon: 28.0473 }, // TENET DNS (South Africa)
  "196.10.54.10": { lat: -26.2041, lon: 28.0473 }, // TENET DNS (South Africa)
};

export const getResolverLocation = (
  resolver: string
): ResolverLocation | null => {
  if (resolver in RESOLVER_LOCATIONS) {
    return RESOLVER_LOCATIONS[resolver as keyof typeof RESOLVER_LOCATIONS];
  }
  return null;
};
