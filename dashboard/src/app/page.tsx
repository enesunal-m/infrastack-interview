import MetricsOverview from "@/components/MetricsOverview";
import TraceList from "@/components/TraceList";
import ServiceHealth from "@/components/ServiceHealth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-4xl font-bold mb-8">InfraStack Observer Dashboard</h1>
      <div className="space-y-8">
        <MetricsOverview />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ServiceHealth />
          <TraceList />
        </div>
      </div>
    </main>
  );
}
