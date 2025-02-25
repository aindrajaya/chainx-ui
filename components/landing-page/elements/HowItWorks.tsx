export default function HowItWorks() {
    const steps = [
      {
        icon: "fa-upload",
        title: "Upload Your Code",
        description: "Simple drag-and-drop interface for your smart contracts",
      },
      {
        icon: "fa-magnifying-glass-chart",
        title: "Analysis Process",
        description: "Advanced static and dynamic analysis of your contracts",
      },
      {
        icon: "fa-file-lines",
        title: "Get Results",
        description: "Detailed vulnerability reports with clear explanations",
      },
    ]
  
    return (
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-grotesk mb-6">
                    Effortless <span className="text-home-500">Security Analysis</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    Secure your smart contracts in three simple steps with our advanced analysis platform
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div 
                        key={index} 
                        className="relative p-8 rounded-2xl border border-neutral-200 bg-white hover:border-home-500 transition-all duration-300 group"
                    >
                        {/* Step Number */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-home-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {index + 1}
                        </div>

                        {/* Icon */}
                        <div className="w-14 h-14 bg-home-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-home-100 transition-colors duration-300">
                            <i className={`fa-solid ${step.icon} text-2xl text-home-500`}></i>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">
                            {step.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                            {step.description}
                        </p>

                        {/* Hover Effect Line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-home-500 group-hover:w-full transition-all duration-500"></div>
                    </div>
                ))}
            </div>

            {/* Features Preview */}
            <div className="mt-20 text-center">
                <div className="inline-flex items-center space-x-2 bg-home-50 px-4 py-2 rounded-full text-home-600 text-sm">
                    <i className="fa-solid fa-sparkles"></i>
                    <span>Powered by Advanced AI Analysis</span>
                </div>

                <div className="mt-12 grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300">
                        <div className="flex items-center justify-center space-x-2 mb-4 text-home-500">
                            <i className="fa-solid fa-shield-check text-xl"></i>
                            <span className="font-semibold">99.9% Accuracy</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300">
                        <div className="flex items-center justify-center space-x-2 mb-4 text-home-500">
                            <i className="fa-solid fa-bolt text-xl"></i>
                            <span className="font-semibold">Real-time Scanning</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300">
                        <div className="flex items-center justify-center space-x-2 mb-4 text-home-500">
                            <i className="fa-solid fa-code text-xl"></i>
                            <span className="font-semibold">Multi-Contract Support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
                <button className="px-8 py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-all duration-300 transform hover:-translate-y-1">
                    Explore All Features
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
      </section>
    )
  }
  
  