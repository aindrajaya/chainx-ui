import { NavItem } from '../molecules/NavItem';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import Link from 'next/link';


export const Header = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if(section){
        section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full bg-white border-b border-neutral-200 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Icon name="fa-link-simple" className="text-2xl text-neutral-800" />
          <span className="text-xl font-bold">
            <Link href="/">ChainX</Link>
            
            </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <NavItem onClick={() => scrollToSection('howitworks')}>How it Works</NavItem>
          <NavItem onClick={() => scrollToSection('features')}>Features</NavItem>
          <NavItem onClick={() => scrollToSection('examples')}>Examples</NavItem>
          <NavItem onClick={() => scrollToSection('contact')}>Contact</NavItem>
        </nav>
        <div className="flex items-center space-x-4">
          <Button className="btn-class" onClick={() => {}}>Log In</Button>
          <Button className="btn-class" onClick={() => {}}>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};
