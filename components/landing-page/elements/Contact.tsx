import Link from "next/link"

export default function Contact() {
  const socialLinks = [
    { icon: "fa-twitter", url: "#" },
    { icon: "fa-github", url: "#" },
    { icon: "fa-linkedin", url: "#" },
  ]

    return (
      <section id="contact" className="py-24 bg-neutral-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-home-100 rounded-full mix-blend-multiply blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-home-50 rounded-full mix-blend-multiply blur-3xl opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative">
            {/* Section Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-home-50 px-4 py-2 rounded-full text-home-600 text-sm mb-6">
                    <i className="fa-solid fa-envelope"></i>
                    <span>Get in Touch</span>
                </div>
                <h2 className="text-4xl font-grotesk mb-6">
                    Need Help Securing Your <span className="text-home-500">Smart Contracts?</span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    Our team of security experts is here to help you protect your blockchain applications
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-home-200 transition-all duration-300 group">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-home-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <i className="fa-solid fa-location-dot text-xl text-home-500"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Our Location</h3>
                                    <p className="text-neutral-600">
                                        123 Blockchain Street<br />
                                        Crypto Valley, CV 12345
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-home-200 transition-all duration-300 group">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-home-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <i className="fa-solid fa-phone text-xl text-home-500"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Contact Info</h3>
                                    <p className="text-neutral-600">
                                        support@chainx.com<br />
                                        +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-home-200 transition-all duration-300 group">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-home-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <i className="fa-solid fa-clock text-xl text-home-500"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Working Hours</h3>
                                    <p className="text-neutral-600">
                                        Monday - Friday: 9AM - 6PM<br />
                                        Weekend: By Appointment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Your Name
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-home-500 focus:border-home-500 transition-all duration-300"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-home-500 focus:border-home-500 transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Message
                                </label>
                                <textarea 
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-home-500 focus:border-home-500 transition-all duration-300"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button 
                                    type="submit"
                                    className="flex-1 px-8 py-4 bg-home-500 text-white rounded-lg hover:bg-home-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                                >
                                    Send Message
                                    <i className="fa-solid fa-paper-plane ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                                </button>
                                
                                <button 
                                    type="button"
                                    className="w-14 h-14 flex items-center justify-center border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors duration-300"
                                >
                                    <i className="fa-solid fa-phone text-neutral-600"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-16 flex justify-center space-x-6">
                    {socialLinks.map((link) => (
                        <Link 
                            key={link.icon} 
                            href={link.url} 
                            className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-home-500 hover:border-home-500 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <i className={`fa-brands ${link.icon} text-xl`}></i>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      </section>
    )
  }
  
  