
<template>
  <div class="project-info">
    <h1 class="title">{{portfolioBy.title}}</h1>
    <div class="content-box">
      <div class="stats" v-html="portfolioBy.PortfolioFields.projectStats" />
      <div class="info" v-html="portfolioBy.PortfolioFields.projectIntro" />
    </div>
  </div>    
</template>