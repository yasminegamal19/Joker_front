import Navbar from "../../components/Public/Navbar/Navbar";
import Hero from "../../components/Public/Hero/Hero";
import Services from "../../components/Public/Services/Services";
import Packages from "../../components/Public/Packages/Packages";
import WhyJoker from "../../components/Public/WhyJoker/WhyJoker";
import CTA from "../../components/Public/CTA/CTA";
import Footer from "../../components/Public/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Packages />
        <WhyJoker />
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default Home;
