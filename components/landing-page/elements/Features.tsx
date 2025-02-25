export default function Features() {
    const features = [
      { icon: "fa-shield-check", title: "Static Analysis", description: "Comprehensive code analysis without execution" },
      { icon: "fa-bolt", title: "Dynamic Analysis", description: "Runtime vulnerability detection" },
      { icon: "fa-gauge-high", title: "Gas Optimization", description: "Efficient contract execution analysis" },
    ]
  
    return (
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 bg-home-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-home-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 relative">
            {/* Section Header */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center space-x-2 bg-home-50 px-4 py-2 rounded-full text-home-600 text-sm mb-6">
                    <i className="fa-solid fa-sparkles"></i>
                    <span>Powerful Security Features</span>
                </div>
                <h2 className="text-4xl font-grotesk mb-6">
                    Advanced Tools for <span className="text-home-500">Smart Contract</span> Security
                </h2>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    Comprehensive security analysis powered by cutting-edge technology
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Static Analysis */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-home-400 to-home-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                    <div className="relative p-8 bg-white rounded-lg border border-neutral-200 hover:border-home-200 transition-all duration-300">
                        <div className="w-14 h-14 bg-home-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <i className="fa-solid fa-shield-check text-2xl text-home-500"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">
                            Static Analysis
                        </h3>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            Comprehensive code analysis without execution, detecting vulnerabilities before deployment.
                        </p>
                        <ul className="space-y-3">
                            {['Pattern Recognition', 'Control Flow Analysis', 'Automated Auditing'].map((item, index) => (
                                <li key={index} className="flex items-center text-sm text-neutral-600">
                                    <i className="fa-solid fa-check text-home-500 mr-3"></i>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Dynamic Analysis */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-home-400 to-home-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                    <div className="relative p-8 bg-white rounded-lg border border-neutral-200 hover:border-home-200 transition-all duration-300">
                        <div className="w-14 h-14 bg-home-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <i className="fa-solid fa-bolt text-2xl text-home-500"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">
                            Dynamic Analysis
                        </h3>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            Real-time vulnerability detection during contract execution and testing.
                        </p>
                        <ul className="space-y-3">
                            {['Runtime Monitoring', 'Transaction Analysis', 'State Verification'].map((item, index) => (
                                <li key={index} className="flex items-center text-sm text-neutral-600">
                                    <i className="fa-solid fa-check text-home-500 mr-3"></i>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Gas Optimization */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-home-400 to-home-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                    <div className="relative p-8 bg-white rounded-lg border border-neutral-200 hover:border-home-200 transition-all duration-300">
                        <div className="w-14 h-14 bg-home-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <i className="fa-solid fa-gauge-high text-2xl text-home-500"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-neutral-900">
                            Gas Optimization
                        </h3>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            Advanced analysis for efficient contract execution and cost reduction.
                        </p>
                        <ul className="space-y-3">
                            {['Cost Analysis', 'Execution Optimization', 'Fee Reduction'].map((item, index) => (
                                <li key={index} className="flex items-center text-sm text-neutral-600">
                                    <i className="fa-solid fa-check text-home-500 mr-3"></i>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="mt-20 grid md:grid-cols-4 gap-6">
                {[
                    { icon: 'fa-clock', text: '24/7 Monitoring' },
                    { icon: 'fa-bolt', text: 'Real-time Alerts' },
                    { icon: 'fa-shield', text: 'Custom Rules' },
                    { icon: 'fa-chart-line', text: 'Performance Analytics' }
                ].map((item, index) => (
                    <div key={index} className="p-6 bg-neutral-50 rounded-xl text-center hover:bg-neutral-100 transition-colors duration-300">
                        <i className={`fa-solid ${item.icon} text-2xl text-home-500 mb-3`}></i>
                        <p className="font-semibold text-neutral-900">{item.text}</p>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-20 text-center">
                <button className="px-8 py-4 bg-home-500 text-white rounded-lg hover:bg-home-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-home-500/20">
                    Explore All Features
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
      </section>
    )
  }
  
  