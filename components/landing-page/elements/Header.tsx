import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed w-full bg-white border-b border-neutral-200 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-link-simple text-2xl text-neutral-800"></i>
          <span className="text-xl font-bold">ChainX</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {["How it Works", "Features", "Examples", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-neutral-600 hover:text-neutral-900"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-neutral-600 hover:text-neutral-900">Log In</button>
          <button className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800">Sign Up</button>
        </div>
      </div>
    </header>
  )
}

