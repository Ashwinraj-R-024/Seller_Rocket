function Hero() {
  const scrollToForm = () => {
    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero">
      <h1>Grow Your E-commerce Business</h1>
      <p>We help you scale on Amazon, Shopify & more</p>
      <button onClick={scrollToForm}>Get Started</button>
    </section>
  );
}

export default Hero;