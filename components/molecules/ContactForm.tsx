"use client"

import {Input} from '../atoms/Input';
import {Button} from '../atoms/Button';

export const ContactForm = () => {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-neutral-700 mb-2">Name</label>
        <Input type="text" placeholder="Enter your name" className="w-full px-4 py-2 border border-neutral-300 rounded-lg" />
      </div>
      <div>
        <label className="block text-neutral-700 mb-2">Email</label>
        <Input type="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-neutral-300 rounded-lg" />
      </div>
      <div>
        <label className="block text-neutral-700 mb-2">Message</label>
        <textarea
          className="w-full px-4 py-2 border border-neutral-300 rounded-lg"
          rows={4}
          placeholder="Enter your message"
        ></textarea>
      </div>
      <Button className="w-full px-6 py-3" onClick={() => alert('Message sent!')}>Send Message</Button>
    </form>
  );
};
