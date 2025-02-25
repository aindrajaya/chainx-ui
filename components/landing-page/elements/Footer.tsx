import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const companyLinks = ["About", "Careers", "Contact"]
  const legalLinks = ["Privacy Policy", "Terms of Service"]
  const socialLinks = [
    { icon: "fa-twitter", url: "#" },
    { icon: "fa-github", url: "#" },
    { icon: "fa-linkedin", url: "#" },
  ]

  return (
    <footer id="footer" className="bg-[#0e784d] text-white py-16">
      <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
              {/* Brand Section */}
              <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                      <i className="fa-solid fa-link-simple text-2xl text-home-400"></i>
                      <Image 
                          alt="main logo"
                          src="/default.ico"
                          width={50}
                          height={50}
                      />
                      <span>ChainX</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                      Secure your smart contracts with confidence. Advanced security analysis for blockchain applications.
                  </p>
                  <div className="flex space-x-4 pt-4">
                      {socialLinks.map((link) => (
                          <Link 
                              key={link.icon} 
                              href={link.url} 
                              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-home-500 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
                          >
                              <i className={`fa-brands ${link.icon} text-xl`}></i>
                          </Link>
                      ))}
                  </div>
              </div>

              {/* Company Links */}
              <div>
                  <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                      Company
                      <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-home-500"></span>
                  </h4>
                  <ul className="space-y-4">
                      {companyLinks.map((link) => (
                          <li key={link}>
                              <Link 
                                  href="#" 
                                  className="text-gray-300 hover:text-home-400 transition-colors duration-300 flex items-center group"
                              >
                                  <i className="fa-solid fa-chevron-right text-home-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-2 text-xs"></i>
                                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                                      {link}
                                  </span>
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Legal Links */}
              <div>
                  <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                      Legal
                      <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-home-500"></span>
                  </h4>
                  <ul className="space-y-4">
                      {legalLinks.map((link) => (
                          <li key={link}>
                              <Link 
                                  href="#" 
                                  className="text-gray-300 hover:text-home-400 transition-colors duration-300 flex items-center group"
                              >
                                  <i className="fa-solid fa-chevron-right text-home-500 opacity-0 group-hover:opacity-100 transition-all duration-300 mr-2 text-xs"></i>
                                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                                      {link}
                                  </span>
                              </Link>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Newsletter Section */}
              <div>
                  <h4 className="text-lg font-bold mb-6 text-white relative inline-block">
                      Stay Updated
                      <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-home-500"></span>
                  </h4>
                  <p className="text-gray-300 mb-4">
                      Subscribe to our newsletter for security updates and news.
                  </p>
                  <form className="space-y-4">
                      <div className="flex flex-col space-y-4">
                          <input 
                              type="email" 
                              placeholder="Enter your email" 
                              className="w-full px-4 py-3 bg-gray-100 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-home-500 transition-all duration-300 placeholder-gray-700"
                          />
                          <button className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-home-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group">
                              Subscribe
                              <i className="fa-solid fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                          </button>
                      </div>
                  </form>
              </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <p>
                      &copy; 2025 <span className="text-home-400">ChainX</span>. All rights reserved.
                  </p>
                  <div className="flex space-x-6">
                      <Link href="#" className="hover:text-home-400 transition-colors duration-300 relative group">
                          Privacy Policy
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-home-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                      <Link href="#" className="hover:text-home-400 transition-colors duration-300 relative group">
                          Terms of Service
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-home-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                      <Link href="#" className="hover:text-home-400 transition-colors duration-300 relative group">
                          Cookie Policy
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-home-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                  </div>
              </div>
          </div>
      </div>
    </footer>
  )
}

