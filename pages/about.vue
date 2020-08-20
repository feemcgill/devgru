<template>
  <div class="about-page">
    <section class="intro">
      <h2>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit similique ducimus dolor reprehenderit, modi cum porro fuga beatae, possimus blanditiis perspiciatis molestiae quia recusandae quas natus, culpa aperiam suscipit quidem!
        Accusamus quis cumque libero esse soluta vel exercitationem repudiandae. Incidunt architecto asperiores corporis quae consequuntur velit nihil temporibus, hic ducimus nam iste molestiae placeat. Animi perferendis ullam recusandae? Impedit, consequuntur.
        Suscipit eveniet natus dolore pariatur sunt non repudiandae harum voluptatem expedita sed dignissimos nulla temporibus aut, modi sit iste amet ipsum, totam corporis asperiores quasi odio tempora officia. At, magni?
        Voluptatem nisi iure aperiam dolorem voluptates quas ut nobis? Officiis, expedita animi. Voluptatum cum, voluptatibus laboriosam accusamus earum quos libero nulla facilis aperiam. Iusto dolor, deserunt porro consequatur quasi sunt!
      </h2>
    </section>
    <section class="specialties">
      <div class="container">
        <ul class="list">
          <li><span>Creative Frontend</span></li>
          <li><span>Wordpress</span></li>
          <li><span>Shopify</span></li>
          <li><span>Banner Ads</span></li>
        </ul>
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.42 44.93"><defs><style>.cls-1{fill:#231f20;}</style></defs><path class="cls-1" d="M34.4,38.7H29.16a23.64,23.64,0,0,1-7.84,6.08c-.89.07-1.55.1-2,.1a15.51,15.51,0,0,1-4.08-.63L14,44.88H12.49c-3.44,0-5.17-1.23-5.17-3.69a4.09,4.09,0,0,1,.08-.63c-2.54-.21-3.8-1.42-3.8-3.63a8.67,8.67,0,0,1,.07-1,4.08,4.08,0,0,1-2.13-1.26,3.33,3.33,0,0,1-.72-2.2,4.49,4.49,0,0,1,.74-2.3A6.62,6.62,0,0,1-.3,25.64q0-2.89,3.12-4.66a17,17,0,0,1,8.3-1.76H12a19,19,0,0,0-1.93-6.12l-.57-1A13,13,0,0,1,7.68,6.74Q7.68,1.51,13.2.2l1-.25L16,7.76l6.51,6.92c.44.52,1.22,1.52,2.32,3l1,1.3A14.87,14.87,0,0,0,28,21.59a3.62,3.62,0,0,0,2.1.48h4.11a19.23,19.23,0,0,1,1.9,8.29A21.93,21.93,0,0,1,34.4,38.7Zm-1.16-1.83a19.1,19.1,0,0,0,1.08-6.12A19.85,19.85,0,0,0,33.13,24c-3,0-4.81-.18-5.56-.53s-1.87-1.58-3.37-3.69q-.91-1.23-2.71-3.48L14.43,8.74,13,2.24C10.68,3,9.5,4.54,9.5,6.74a7.36,7.36,0,0,0,1.2,3.73l.46.77A17,17,0,0,1,13.9,20l0,1H12.67a24.28,24.28,0,0,0-8.43,1.11q-2.82,1.13-2.82,3.37a4.59,4.59,0,0,0,1.46,3.46,5,5,0,0,0,3.57,1.41H8.6L15,27.43a4.42,4.42,0,0,0-3.87-2.2,6.53,6.53,0,0,0-1.62.28,23.38,23.38,0,0,0-2.32.85l-1.65.08L3.88,24.67l2.85,0A14,14,0,0,1,9,23.86a8.23,8.23,0,0,1,1.86-.25q4.5,0,6.57,4.6l-1.19.56a7.26,7.26,0,0,1,3.41,3.77l-1.37.59a9.48,9.48,0,0,1,3,3.47l-2.18,1A9.2,9.2,0,0,1,22,41.33l-4.32,1.94a9.39,9.39,0,0,0,1.79.21l1.37,0a24.9,24.9,0,0,0,7.59-6.57Zm-16-5.1a5.4,5.4,0,0,0-2.95-2.08L9,32H7.13a8.61,8.61,0,0,1-4-.74,2.08,2.08,0,0,0-.46,1.18,1.73,1.73,0,0,0,1.08,1.62A7.37,7.37,0,0,0,7,34.62H10.7Zm1.48,4.1-.28-.35a6.19,6.19,0,0,0-2-1.56L11,36.34H5.32l-.1.45q0,2.09,4.11,2.08H12Zm.74,4.76L19,40.14a7.67,7.67,0,0,0-1.69-1.73l-5,2.25H9.05v.22c0,1.57,1.14,2.35,3.43,2.35h1.17Z" transform="translate(0.3 0.05)"/></svg>
      </div>
    </section>
    <section class="personnel">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
    </section>
    <section class="contact">
      <div class="container">
        <div class="form">
          <ContactForm />
        </div>
      </div>
    </section>
  </div>  
</template>

<script>
import ContactForm from '~/components/ContactForm'

export default {
  components: {
    ContactForm
  }
}
</script>

<style lang="scss" scoped>

  .intro {
    min-height: 100vh;
    display: flex;
    align-items: center;
    color: $flair;
    @include container;
    h2 {
      font-size: 2.4em;
      line-height: 1.2em;
    }
  }
  .specialties {
    background-color: $white;
    background-image: url('~assets/patterns/cross-1-white.png');
    background-color: $flair;
    mix-blend-mode: screen;
    z-index: 1;
    position: relative;
    margin: 5em 0;
    .container {
      @include container;
      display: flex;
    }
    .list {
      color: $white;
      font-size: 3em;
      font-weight: bold;
      list-style: none;
      @include container;
      padding: 0.5em 0;
      li {
        color: $flair;
        margin: 0;
        span {
          background: $white;
          padding: 10px;
          overflow: hidden;
          display: inline-block;
          margin: 0;
        }
      }
    }
    svg {
      width: 20%;
      margin-left: 10%;
      * {
        fill: $white;
      }
    }  
  }
  .personnel {
    @include container;
    margin-top: 5em;
    margin-bottom: 5em;
    .container {
      position: relative;
      z-index: 100;
    }
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 23%;
        padding-bottom: 25%;
        background-color: $flair;
      }
    }
    
  }
  .contact {
    background: $flair;
    position: relative;
    @include pattern-blend('~assets/patterns/diag-stripe-top-right.png');
    .container {
      position: relative;
      z-index: 100;
      @include container;
      padding: 2.5em 0;
    }    
  }


</style>