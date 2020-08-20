<template>
<div class="contact-page">
  <div class="container">
    <h1>Contact<br /> Development<br /> Group</h1>
    <ContactDeets />
    <div class="the-form">
      <ContactForm />
    </div>
    <Legal />
  </div>
</div>
</template>
<script>
import ContactForm from '~/components/ContactForm'
import ContactDeets from '~/components/ContactDeets'
import Legal from '~/components/Legal'

export default {
  components: {
    ContactForm,
    ContactDeets,
    Legal
  }
  // apollo: { 
  //   page: {
  //     query: gql`
  //     `,
  //   }
  // }
}
</script>
<style lang="scss" scoped>
  h1 {
    color: $flair;
    font-size: 6em;
    line-height: 0.7;
    text-align: center;
    margin-bottom: 1em;
  }
  .container {
    @include container;
    margin-top: 3em;
    margin-bottom: 3em;
  }
  .the-form {
    max-width: 700px;
    margin: 5em auto;    
  }
</style>