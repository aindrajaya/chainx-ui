export default function Hero() {
    return (
      <section id="hero" className="h-[800px] flex items-center bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold leading-tight mb-6">
                ChainX: Secure Your Smart Contracts with Confidence
              </h1>
              <p className="text-xl text-neutral-600 mb-8">
                Automated vulnerability detection for Solidity and Vyper contracts.
              </p>
              <button className="px-8 py-4 bg-neutral-900 text-white rounded-lg text-lg hover:bg-neutral-800">
                Start Scanning for Free
              </button>
            </div>
            <div className="bg-neutral-300 h-[400px] rounded-xl flex items-center justify-center">
              <span className="text-white">Blockchain Security Illustration</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  