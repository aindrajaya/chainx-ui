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
          <h2 className="text-3xl font-bold text-center mb-16">Effortless Smart Contract Security</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fa-solid ${step.icon} text-2xl text-neutral-600`}></i>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  