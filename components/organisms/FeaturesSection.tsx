import { FeatureCard } from '../molecules/FeatureCard';

export const FeaturesSection = () => {
  return (
    <section id='features' className="py-24 px-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Powerful Features for Secure Development</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon="fa-shield-check"
            title="Static Analysis"
            description="Comprehensive code analysis without execution"
          />
          <FeatureCard
            icon="fa-bolt"
            title="Dynamic Analysis"
            description="Runtime vulnerability detection"
          />
          <FeatureCard
            icon="fa-gauge-high"
            title="Gas Optimization"
            description="Efficient contract execution analysis"
          />
        </div>
      </div>
    </section>
  );
};
