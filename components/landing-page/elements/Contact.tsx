export default function Contact() {
    return (
      <section id="contact" className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-neutral-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-neutral-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-neutral-700 mb-2">Message</label>
                <textarea className="w-full px-4 py-2 border border-neutral-300 rounded-lg" rows={4}></textarea>
              </div>
              <button className="w-full px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    )
  }
  
  