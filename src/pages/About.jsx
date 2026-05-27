import './About.css';
import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero section-padding">
        <div className="container">
          <h1 className="hero-title">Our <span>Story</span></h1>
          <p className="section-subtitle">Redefining modern menswear with a commitment to quality and craftsmanship.</p>
        </div>
      </section>

      <section className="about-content section-padding">
        <div className="container grid-2">
          <div className="about-image">
            <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Craftsmanship" />
          </div>
          <div className="about-text">
            <h2>Heritage Meets <span>Innovation</span></h2>
            <p>Founded in 2024, True Fit began with a simple mission: to create clothes that feel as good as they look. We believe that true style isn't just about what you wear, but how you feel in it.</p>
            <p>Every piece in our collection is meticulously designed and sourced from the finest materials. Our team of designers works tirelessly to ensure that each item meets our rigorous standards for fit, comfort, and durability.</p>
            <div className="about-stats">
              <div className="stat">
                <strong>10+</strong>
                <span>Categories</span>
              </div>
              <div className="stat">
                <strong>230k</strong>
                <span>Happy Clients</span>
              </div>
              <div className="stat">
                <strong>100%</strong>
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-values section-padding">
        <div className="container">
          <h2 className="section-title text-center">Our <span>Values</span></h2>
          <div className="grid-3">
            <div className="value-card">
              <h3>Quality First</h3>
              <p>We never compromise on materials. From Egyptian cotton to premium wool blends, only the best makes it to our shop.</p>
            </div>
            <div className="value-card">
              <h3>Timeless Design</h3>
              <p>We create pieces that transcend trends. Our goal is to build a wardrobe that stays relevant for years to come.</p>
            </div>
            <div className="value-card">
              <h3>Ethical Sourcing</h3>
              <p>We care about where our clothes come from. We work exclusively with partners who share our commitment to fair labor.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;
