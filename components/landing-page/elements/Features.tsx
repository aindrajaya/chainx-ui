export default function Features() {
    const features = [
      { icon: "fa-shield-check", title: "Static Analysis", description: "Comprehensive code analysis without execution" },
      { icon: "fa-bolt", title: "Dynamic Analysis", description: "Runtime vulnerability detection" },
      { icon: "fa-gauge-high", title: "Gas Optimization", description: "Efficient contract execution analysis" },
    ]
  
    return (
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Powerful Features for Secure Development</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-neutral-200 rounded-xl">
                <i className={`fa-solid ${feature.icon} text-2xl text-neutral-600 mb-4`}></i>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  