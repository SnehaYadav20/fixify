
import "./About.css";
import about from '../../images/about.png';
import { useAuth } from "../../store/auth";

const About = () => {
  const {user}=useAuth();
  return (
    <>
    <main>
      <section className="section-hero">
      <p >Fixify: Your Home, Your Service, Your Match</p>
            <h1 className="main-heading">About Us</h1>
        <div className="container grid grid-two-cols">
          
        <div className="hero-content">
          <p >Welcome, {user? `${user.name} to Fxify`:`to Fixify`}</p>
          <h2 className="custom-heading2">Who We Are?</h2>
          <p >Fixify is a team of dedicated professionals committed to providing exceptional home services. We understand the importance of a well-maintained home and strive to be your go-to solution for all your household needs. Our platform is designed to connect homeowners with skilled and trustworthy service providers, ensuring a hassle-free experience for all.</p>

          <h2 className="custom-heading2">What We Do?</h2>
          <p >At Fixify, we simplify the process of finding reliable professionals for your home improvement and maintenance tasks. Whether you need a plumber, electrician, handyman, or any other service, Fixify has you covered. Our user-friendly platform allows you to browse through a diverse range of services, read reviews, and effortlessly hire the right match for your requirements.</p>

          <h2 className="custom-heading2">Why Us?</h2>
          <p >Choosing Fixify means choosing quality, reliability, and convenience. We prioritize customer satisfaction and strive to exceed your expectations with every service request. Our rigorous vetting process ensures that only skilled and trustworthy professionals are part of our network. With transparent pricing, secure transactions, and a responsive customer support team, Fixify is the smart choice for all your home service needs.</p>

          <h2 className="custom-heading2">Our Mission:</h2>
          <p >At Fixify, our mission is to revolutionize the home service industry by providing a seamless platform that connects homeowners with top-rated professionals. We aim to transform the way people access and experience home services, making it easier and more convenient to maintain and improve their living spaces.</p>
          
        </div>
        
        <div className="hero-image">
          <img src={about} alt="About Us" className="about-image" />
        </div>
      </div>

      <div className="our-values">
        <h2 className="custom-heading2">Our Values</h2>
        <ul>
          <li>Customer Satisfaction: We prioritize the needs and satisfaction of our customers above all else.</li>
          <li>Quality Service: We believe in delivering high-quality services that meet and exceed industry standards.</li>
          <li>Trust and Transparency: We build trust through transparency in our processes, pricing, and communication.</li>
          <li>Innovation: We continuously strive to innovate and improve our platform to better serve our users.</li>
          <li>Community Engagement: We are committed to giving back to the communities we serve and fostering positive relationships with our stakeholders.</li>
        </ul>

        <h2 className="custom-heading2">Our Team</h2>
        <ul>
          <li>Sneha Yadav - Full Stack Developer</li>
          <li>Krati Vishnoi - Frontend and UI Designer</li>
          <li>Kanika Yadav - Frontend Developer</li>
          <li>Shambhavi Jaiswal - Database Administrator</li>
        </ul>
        
      </div>
        
      </section>
    </main>
    </>
  );
};

export default About;
