import { Metadata } from 'next'
import HelloComponent from '../components/HelloComponent'
import Home from '../components/landing-page'
// import Home from '../components/landing-page/landingpage'
// import HomeAtomic from '../components/landingpage'
 
export const metadata: Metadata = {
  title: 'Chainx - Smart Contract Security Scanner',
}
 
export default function Page() {
  return (
    <div className=''>
      <Home />
    </div>
  )
}