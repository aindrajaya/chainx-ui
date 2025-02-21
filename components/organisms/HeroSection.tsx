import { Button } from '../atoms/Button';

export const HeroSection = () => {
  return (
    <section className="h-[80vh] flex items-center bg-neutral-50 m-4 p-4">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              ChainX: Secure Your Smart Contracts with Confidence
            </h1>
            <p className="text-xl text-neutral-600 mb-8">
              Automated vulnerability detection for Solidity and Vyper contracts.
            </p>
            <Button className="px-8 py-4 text-lg" onClick={() => console.log('Button clicked')}>
              Start Scanning for Free
            </Button>
          </div>
          <div className="bg-neutral-300 h-[400px] rounded-xl flex items-center justify-center">
            <span className="text-white">Blockchain Security Illustration</span>
          </div>
        </div>
      </div>
    </section>
  );
};
