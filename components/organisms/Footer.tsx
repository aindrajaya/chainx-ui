import { FooterLink } from '../molecules/FooterLink';
import { Icon } from '../atoms/Icon';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12 px-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="fa-link-simple" className="text-2xl" />
              <span className="text-xl font-bold">ChainX</span>
            </div>
            <p className="text-neutral-400">Secure your smart contracts with confidence</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><FooterLink onClick={() => {}}>About</FooterLink></li>
              <li><FooterLink onClick={() => {}}>Careers</FooterLink></li>
              <li><FooterLink onClick={() => {}}>Contact</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><FooterLink onClick={() => {}}>Privacy Policy</FooterLink></li>
              <li><FooterLink onClick={() => {}}>Terms of Service</FooterLink></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <FooterLink onClick={() => {}}>
                <Icon name="fa-brands fa-twitter" className="text-xl" />
              </FooterLink>
              <FooterLink onClick={() => {}}>
                <Icon name="fa-brands fa-github" className="text-xl" />
              </FooterLink>
              <FooterLink onClick={() => {}}>
                <Icon name="fa-brands fa-linkedin" className="text-xl" />
              </FooterLink>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
          <p>&copy; 2025 ChainX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
