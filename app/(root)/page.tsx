import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  GraduationCap,
  BarChart,
  BookOpen,
  Users,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-73px)]">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Your All-in-One University Hub
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Plan your degree, track your progress, and connect with fellow students.
            Take control of your university journey with UniPlanner.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/planner">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={GraduationCap}
              title="Degree Planner"
              description="Create custom degree plans and track your academic progress with ease."
              href="/planner"
            />
            <FeatureCard
              icon={BarChart}
              title="GPA Calculator"
              description="Calculate and monitor your GPA to stay on top of your academic goals."
              href="/gpa"
            />
            <FeatureCard
              icon={BookOpen}
              title="Blog"
              description="Share your experiences and learn from other students' journeys."
              href="/blog"
            />
            <FeatureCard
              icon={Users}
              title="Forum"
              description="Connect with peers, ask questions, and participate in discussions."
              href="/forum"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <Link href={href} className="space-y-4">
        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Link>
    </Card>
  );
}