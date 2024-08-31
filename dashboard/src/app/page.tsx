import ServiceMap from "@/components/ServiceMap";
import ServiceList from "@/components/ServiceList";
import ServiceDetail from "@/components/ServiceDetail";

export default function Home() {
  return (
    <main className="p-4 space-y-8">
      <h1 className="text-3xl font-bold">Service Dashboard</h1>
      <ServiceMap />
      <ServiceList />
      <ServiceDetail serviceName="User Service" />
    </main>
  );
}
