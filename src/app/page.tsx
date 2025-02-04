import DNSChecker from "@/components/DNSChecker";
import { Globe2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-4 md:pt-8">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex flex-col items-center justify-center mb-8">
          <Globe2 className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-2">
            DNS Propagation Checker
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Monitor your domain&#39;s DNS propagation across different resolvers
            worldwide.
          </p>
        </div>
        <DNSChecker />
      </div>
    </main>
  );
}
