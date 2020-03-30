<template>
  <div class="home-page">
    <Header />
    <SecondSection />
    <ThirdSection />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/home/Header.vue'
import SecondSection from '@/components/home/SecondSection.vue'
import ThirdSection from '@/components/home/ThirdSection.vue'
import Footer from '@/components/home/Footer.vue'

export default {
  components: {
    Header,
    SecondSection,
    ThirdSection,
    Footer
  }  
}
</script>
