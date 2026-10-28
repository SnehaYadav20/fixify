import homepage from '../../images/home.png';
import "./HomePage.css"
import { useAuth } from "../../store/auth";

const HomePage=()=>{
  const {user}=useAuth();
  return(
    <>
    <main>
      <section className="section-hero">
      <p className="hero-tagline">Your Home, Your Service, Your Match !!</p>
            <h1 className="main-heading">Welcome to FIXIFY</h1>
        <div className="container grid grid-two-cols">
          
          <div className="hero-content">
            
          <p >Welcome, {user? `${user.name} to Fxify`:`to Fixify`}<br/>
            
            <p >At Fixify, we're not just a platform – we're your trusted partner in creating the home of your dreams! Say goodbye to the headaches of finding the right plumber, electrician, or carpenter. With Fixify, your home service needs are our top priority, and we've got the perfect solution for every task!</p>
            <p >Picture this: you wake up to a leaky faucet, a flickering light, or a squeaky door. Instead of stressing out, you simply reach for your phone and open the Fixify app. Within minutes, you're greeted by a vibrant array of services tailored to meet your every need. From routine maintenance to emergency repairs, our diverse network of skilled professionals is here to save the day!</p>
            <p >Booking with Fixify is as easy as pie. With just a few taps, you can browse through our curated list of services, each accompanied by glowing reviews and sparkling ratings. Need a plumber to fix that pesky leak? A few swipes, and they're on their way! Want an electrician to brighten up your space? Consider it done!</p>
            <p > But wait, there's more! Our service providers aren't just skilled – they're superheroes in disguise! Each one undergoes rigorous vetting and training to ensure they meet our high standards of excellence. Rest assured, your home is in the hands of professionals who take pride in their craft and are committed to delivering nothing short of perfection.</p>
            <p >At Fixify, we believe that home is where the heart is – and we're here to make sure your heart skips a beat with joy! Join our ever-growing community of satisfied customers and dedicated service providers today. Experience the convenience, reliability, and peace of mind that only Fixify can offer. After all, when it comes to your home, why settle for anything less than extraordinary?</p>
            <p >Welcome to Fixify – where every home service is a work of art, and every customer is treated like royalty. Let's turn your house into a home worth cherishing together!</p>
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img src={homepage} alt="Coding Together" width="500" height="500" />
          </div>
        </div>
        
      </section>
    </main>
    </>
  )
}
export default HomePage;