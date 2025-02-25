export default function Example() {
    return (
      <section id="examples" className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-grotesk mb-6">
                    See ChainX in <span className="text-home-500">Action</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    Real-time vulnerability detection and smart contract analysis
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Code Editor Panel */}
                <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-home-400 to-home-600 rounded-lg blur opacity-20"></div>
                    <div className="relative bg-neutral-900 rounded-lg overflow-hidden">
                        {/* Editor Header */}
                      <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
                          <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-neutral-400">
                              <span className="px-2 py-1 rounded bg-neutral-700">Solidity</span>
                              <span className="px-2 py-1 rounded bg-neutral-700">0.8.0</span>
                          </div>
                      </div>

                      {/* Code Content */}
                      <div className="p-6">
                          <pre className="text-sm text-neutral-300 font-mono leading-relaxed">
                              <code>{`// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.0;

  contract VulnerableContract {
      mapping(address => uint) public balances;
      
      function withdraw() public {
          require(balances[msg.sender] > 0);
          
          // Vulnerable to reentrancy
          (bool success, ) = msg.sender.call{
              value: balances[msg.sender]
          }("");
          
          balances[msg.sender] = 0;
      }
  }`}</code>
                          </pre>
                      </div>
                  </div>
              </div>

              {/* Analysis Results Panel */}
              <div className="space-y-6">
                  {/* Scan Status */}
                  <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-neutral-900">Scan Results</h3>
                          <span className="px-3 py-1 bg-home-50 text-home-600 rounded-full text-sm">
                              Complete
                          </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-neutral-600">
                          <span className="flex items-center">
                              <i className="fa-solid fa-clock mr-2"></i>
                              Scan time: 2.3s
                          </span>
                          <span className="flex items-center">
                              <i className="fa-solid fa-code-branch mr-2"></i>
                              Version: 0.8.0
                          </span>
                      </div>
                  </div>

                  {/* Vulnerabilities */}
                  <div className="space-y-4">
                      <div className="p-6 bg-red-50 rounded-lg border border-red-200 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/5 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
                          <div className="relative">
                              <div className="flex items-start justify-between mb-3">
                                  <div>
                                      <h4 className="font-bold text-red-700 mb-1">Critical Vulnerability</h4>
                                      <p className="text-red-600">Reentrancy Attack Vector Detected</p>
                                  </div>
                                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">High Risk</span>
                              </div>
                              <p className="text-sm text-red-600 mb-3">
                                  External call is made before state update, potentially allowing recursive calls to drain funds.
                              </p>
                              <div className="flex items-center space-x-4">
                                  <button className="text-sm text-red-700 hover:text-red-800 flex items-center">
                                      <i className="fa-solid fa-book mr-2"></i>
                                      Learn More
                                  </button>
                                  <button className="text-sm text-red-700 hover:text-red-800 flex items-center">
                                      <i className="fa-solid fa-code mr-2"></i>
                                      View Fix
                                  </button>
                              </div>
                          </div>
                      </div>

                      <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-500/5 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
                          <div className="relative">
                              <div className="flex items-start justify-between mb-3">
                                  <div>
                                      <h4 className="font-bold text-yellow-700 mb-1">Gas Optimization</h4>
                                      <p className="text-yellow-600">Inefficient Gas Usage</p>
                                  </div>
                                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Medium</span>
                              </div>
                              <p className="text-sm text-yellow-600 mb-3">
                                  Consider using the Checks-Effects-Interactions pattern to optimize gas usage.
                              </p>
                              <button className="text-sm text-yellow-700 hover:text-yellow-800 flex items-center">
                                  <i className="fa-solid fa-lightbulb mr-2"></i>
                                  View Recommendation
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                      <button className="flex-1 px-6 py-3 bg-home-500 text-white rounded-lg hover:bg-home-600 transition-all duration-300 flex items-center justify-center">
                          <i className="fa-solid fa-shield-check mr-2"></i>
                          Fix Vulnerabilities
                      </button>
                      <button className="px-6 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-all duration-300">
                          <i className="fa-solid fa-download"></i>
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </section>
    )
  }
  
  