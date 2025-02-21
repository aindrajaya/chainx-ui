export default function Example() {
    return (
      <section id="example" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">See ChainX in Action</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-neutral-800 p-6 rounded-xl">
              <pre className="text-neutral-300 overflow-x-auto">
                {`contract Example {
    function vulnerable() {
        // Code snippet
    }
  }`}
              </pre>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <h3 className="text-xl font-bold mb-4">Scan Results</h3>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-100 rounded">
                  <h4 className="font-bold">High Severity</h4>
                  <p className="text-neutral-600">Reentrancy vulnerability detected</p>
                </div>
                <div className="p-4 bg-neutral-100 rounded">
                  <h4 className="font-bold">Medium Severity</h4>
                  <p className="text-neutral-600">Unchecked external call</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  