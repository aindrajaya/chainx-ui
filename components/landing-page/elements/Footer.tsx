import Link from "next/link"

export default function Footer() {
  const companyLinks = ["About", "Careers", "Contact"]
  const legalLinks = ["Privacy Policy", "Terms of Service"]
  const socialLinks = [
    { icon: "fa-twitter", url: "#" },
    { icon: "fa-github", url: "#" },
    { icon: "fa-linkedin", url: "#" },
  ]

  return (
    <footer id="footer" className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fa-solid fa-link-simple text-2xl"></i>
              <span className="text-xl font-bold">ChainX</span>
            </div>
            <p className="text-neutral-400">Secure your smart contracts with confidence</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-neutral-400">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link key={link.icon} href={link.url} className="text-neutral-400 hover:text-white">
                  <i className={`fa-brands ${link.icon} text-xl`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
          <p>&copy; 2025 ChainX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

