import { ContactForm } from '../molecules/ContactForm';

export const ContactSection = () => {
  return (
    <section id='contact' className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Get in Touch</h2>
        <div className="max-w-2xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
