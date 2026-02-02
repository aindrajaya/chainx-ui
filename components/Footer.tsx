export default function Footer() {
    return (
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left">© 2025 ChainX. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  