import Hero from "@/components/site/Hero";
import Generator from "@/components/site/Generator";
// import Content from "@/components/site/Content";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Generator />
      {/* <Content /> */}
    </main>
  );
}