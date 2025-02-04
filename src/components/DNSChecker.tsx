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
import { Loader2, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DNSMap from "@/components/DNSMap";

export interface DNSResult {
  resolver: string;
  ip: string;
  ttl: number;
  lat: number;
  lon: number;
}

export default function DNSChecker() {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, recordType }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch DNS information");
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-zinc-900/90 shadow-xl flex-1 flex flex-col max-h-screen overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Check DNS Records</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Enter a domain name and select the record type to check its
          propagation status.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
          <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
            <div className="lg:flex-1 h-[400px] order-2 lg:order-1">
              <div className="rounded-lg border bg-card h-full flex flex-col dark:border-gray-800 dark:bg-zinc-800/50">
                <div className="p-4 border-b bg-muted/50 dark:border-gray-800 dark:bg-zinc-800/80">
                  <h3 className="font-semibold dark:text-gray-200">
                    DNS Resolution Results
                  </h3>
                </div>
                <div className="overflow-auto flex-1">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-background dark:bg-zinc-800/90">
                      <tr className="border-b dark:border-gray-800">
                        <th className="h-12 px-4 text-left font-medium text-muted-foreground dark:text-gray-400">
                          Resolver
                        </th>
                        <th className="h-12 px-4 text-left font-medium text-muted-foreground dark:text-gray-400">
                          IP Address
                        </th>
                        <th className="h-12 px-4 text-left font-medium text-muted-foreground dark:text-gray-400">
                          TTL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/50 dark:border-gray-800 dark:hover:bg-zinc-800/50"
                        >
                          <td className="p-4 dark:text-gray-300">
                            {result.resolver}
                          </td>
                          <td className="p-4 font-mono dark:text-gray-300">
                            {result.ip}
                          </td>
                          <td className="p-4 dark:text-gray-300">
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
              <DNSMap dnsResults={results} />
            </div>
          </div>
        ) : (
          <Alert className="dark:bg-zinc-800 dark:text-gray-300">
            <AlertTitle>No Results</AlertTitle>
            <AlertDescription className="dark:text-gray-400">
              Enter a domain name and record type to check DNS propagation
              status.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
