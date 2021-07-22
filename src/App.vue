<template>
  <v-app>
    <byu-header id="hide-from-print">
      <byu-user-info-oauth slot="user"></byu-user-info-oauth>
      <h1 slot="site-title">Restaurant Finder</h1>
      <byu-menu slot="nav">
        <router-link to='/'>Home</router-link>
      </byu-menu>
    </byu-header>
    <div class="page-content">
      <router-view /> 
    </div>
    <byu-footer></byu-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.page-content {
	margin: 0 auto;
	max-width: 1200px;
	width: 100%;
  height: 100%;
	flex: 1;
  box-sizing:border-box;
  margin-top: 16px;
  background-color: white;
  flex-direction: column;
  overflow: visible;
}

html, body {
	min-height: 100%;
  background-color: #f6f6f6;
  font-family: 'HCo Ringside Narrow SSm';
  color: black;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Public Sans';
}

#app {
	display: flex;
	flex-direction: column;
	height: 100%;
}

body * {
  box-sizing: border-box;
}

byu-footer {
	margin-top: 25px;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

#loading-page {
  width: 100%; 
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.ql-align-center {
    display: flex !important;
    justify-content: center !important;
}
</style>
