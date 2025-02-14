<template>
  <div class="about-page">
    <div class="inner">
      <div class="logo">
        <LogoIcon />
      </div>
      <p>
        We are Development Group, a nimble, high-end creative web development studio. We
        are platform agnostic, but do a lot of work in <strong>React, Vue, Shopify, Webflow and
          Wordpress.</strong> We've likely
        dabbled in your stack.
      </p>
      <p> We partner with like-minded creative agencies to help them build out their visions and navigate
        development project lifecycles. We also engage directly with brands and organizations to help create, grow
        and maintain their digital properties. We'd like to think we provide the value of a freelancer with the
        confidence and depth of a battle-tested code consultancy.

      </p>
      <p>

        Our goal is to wow your designers and creative team, mitigate stress for your project managers and
        leadership, and add value for your clients and stakeholders.
      </p>
      <p>


        Deliverables include visually stunning, accessible and performant frontends; clean and secure backends;
        and clear lockstep communication with our partners.

      </p>
      <p>

        At the end of the day we want you to know that we got you.
      </p>
      <p>
        No surprises. Let's talk!
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  font-family: var(--alt_font);

  .logo {
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
    margin-bottom: 50px;
  }

  .inner {
    max-width: 800px;
    font-size: 2.3em;
    font-weight: 100;
    padding: 50px;
    margin: 0 auto;

    p {
      margin-bottom: 1em;
    }
  }
}
</style>