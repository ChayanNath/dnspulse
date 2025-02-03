"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Globe2, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DNSMap from "@/components/DNSMap";

export interface DNSResult {
  resolver: string;
  ip: string;
  ttl: number;
  lat: number;
  lon: number;
}

export default function Home() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState("A");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DNSResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResults([]);
    setError(null);

    try {
      const response = await fetch("/api/dns-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain, recordType }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch DNS information");
        }
        setResults(data.results);
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response from server: ${text}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        <div className="flex flex-col items-center justify-center mb-8">
          <Globe2 className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-2">
            DNS Propagation Checker
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Monitor your domain&#39;s DNS propagation across different resolvers
            worldwide
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 shadow-xl flex-1 flex flex-col">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Check DNS Records
            </CardTitle>
            <CardDescription>
              Enter a domain name and select the record type to check its
              propagation status
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Enter domain (e.g., example.com)"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={recordType} onValueChange={setRecordType}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Record Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A Record</SelectItem>
                    <SelectItem value="AAAA">AAAA Record</SelectItem>
                    <SelectItem value="CNAME">CNAME Record</SelectItem>
                    <SelectItem value="MX">MX Record</SelectItem>
                    <SelectItem value="TXT">TXT Record</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking DNS Records...
                  </>
                ) : (
                  "Check DNS Propagation"
                )}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results.length > 0 ? (
              <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                <div className="lg:flex-1 lg:min-h-[500px] order-2 lg:order-1">
                  <div className="rounded-lg border bg-card h-full flex flex-col">
                    <div className="p-4 border-b bg-muted/50">
                      <h3 className="font-semibold">DNS Resolution Results</h3>
                    </div>
                    <div className="overflow-auto flex-1">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-background">
                          <tr className="border-b">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              Resolver
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              IP Address
                            </th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                              TTL
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result, index) => (
                            <tr
                              key={index}
                              className="border-b transition-colors hover:bg-muted/50"
                            >
                              <td className="p-4 align-middle">
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {result.resolver === "8.8.8.8"
                                      ? "Google DNS"
                                      : result.resolver === "1.1.1.1"
                                      ? "Cloudflare DNS"
                                      : result.resolver}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {result.resolver === "8.8.8.8"
                                      ? "United States"
                                      : result.resolver === "1.1.1.1"
                                      ? "Global Network"
                                      : ""}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 align-middle font-mono">
                                {result.ip}
                              </td>
                              <td className="p-4 align-middle">
                                {result.ttl}s
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="lg:flex-1 h-[400px] lg:h-auto order-1 lg:order-2">
                  <div className="rounded-lg border bg-card h-full">
                    <div className="p-4 border-b bg-muted/50">
                      <h3 className="font-semibold">Global Distribution</h3>
                    </div>
                    <DNSMap dnsResults={results} />
                  </div>
                </div>
              </div>
            ) : (
              <Alert>
                <AlertTitle>No Results</AlertTitle>
                <AlertDescription>
                  Enter a domain name and record type to check DNS propagation
                  status
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
