import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="min-h-[80vh] flex flex-col items-center justify-center bg-black text-center px-6">
        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
          <AlertCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-6xl font-serif font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-serif text-white/80 mb-8">Stage Not Found</h2>
        <p className="text-white/60 max-w-md mb-12">
          The page you are looking for doesn't exist, has been moved, or the band has already packed up their gear.
        </p>
        <Link href="/">
          <Button size="lg" className="px-10 h-14">Return to Main Stage</Button>
        </Link>
      </section>
    </Layout>
  );
}
