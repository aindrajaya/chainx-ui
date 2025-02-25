"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Hero() {
  const router = useRouter()
    return (
      <section id="hero" className="min-h-[800px] flex items-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10">
                {/* Optional Announcement Banner */}
                <div className="inline-block px-4 py-2 bg-home-50 text-home-600 rounded-full text-sm mb-8">
                    🎉 Now supporting Solidity version 0.8.20
                </div>
            </div>

            <div className="text-center mb-16">
                <h1 className="text-6xl font-grotesk mb-6">
                    Smart Contract Security
                    <span className="text-home-500"> Simplified</span>
                </h1>
                <p className="text-xl w-full mx-auto lg:w-2/3 text-neutral-600">
                    Automated vulnerability detection for Solidity and Vyper contracts
                </p>
                <div className="mt-8 flex flex-col md:flex-row gap-8 justify-center items-center">
                    <button
                      className="px-8 py-4 bg-[#0e784d] text-white rounded-lg text-lg hover:bg-home-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-home-500/20"
                      onClick={() => router.push("/auth/signin")}
                    >
                        Start Scanning Free
                    </button>
                    <button 
                      className="px-8 py-4 border-2 border-home-500 text-home-500 rounded-lg text-lg hover:bg-home-50 transition-all duration-300"
                      onClick={() => router.push("https://docs.chainx.id")}
                    >
                        View Documentation
                    </button>
                </div>
            </div>

            {/* Terminal-style Code Display */}
            {/* <div className="relative w-full lg:w-2/3 mx-auto mt-1 py-14">
                <div className="absolute -left-20 top-20 -z-[1] w-32 h-32 bg-home-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -right-20 top-20 -z-[1] w-32 h-32 bg-home-500/10 rounded-full blur-3xl"></div>
                
                <div className="rounded-lg border-neutral-800 border border-solid w-full bg-neutral-900 overflow-hidden"
                    style={{
                        boxShadow: "0px 0px 0px 0.5px rgba(255, 255, 255, 0.20), 0px 5px 12px 0px rgba(0, 0, 0, 0.50)"
                    }}>
                    <div className="flex items-center px-4 py-3 bg-neutral-800 border-b border-neutral-700">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                    <div className="p-4 text-left">
                        <code className="block text-sm text-neutral-300">
                            <p className="text-neutral-500 mb-2"># Quick scan</p>
                            <p className="mb-4">
                                <span className="text-home-400">chainx</span>
                                <span className="text-white"> scan</span>
                                <span className="text-cyan-400"> contract.sol</span>
                            </p>

                            <p className="text-neutral-500 mb-2"># Advanced analysis</p>
                            <p className="mb-0">
                                <span className="text-home-400">chainx</span>
                                <span className="text-white"> analyze</span>
                                <span className="text-cyan-400"> --deep contract.sol</span>
                            </p>
                        </code>
                    </div>
                </div>
            </div> */}
            <div className="relative w-4/5 mx-auto h-[400px]"> {/* Container with 80% width */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image 
                        alt="image hero" 
                        src="/chainx.jpg" 
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                        className="rounded-lg"
                    />
                    {/* Bottom fade effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
                </div>
            </div>
            

        </div>
      </section>
    )
  }
  
  