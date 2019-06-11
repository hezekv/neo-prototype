<template>
  <nav>

    <v-snackbar v-model="snackbar" :timeout="3000" top color="success">
      <span>Location successfully added.</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <!-- <span class="font-weight-light">Ace</span> -->
        <span>Final Control</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <!-- <v-menu offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title>{{ link.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img class="text-lg-center" src="/my-photo.png">
          </v-avatar>
          <p class="white--text subheading mt-1">{{ userName }}</p>
        </v-flex>
        <v-flex class="mt-4 mb-3">
          <AddLocation @locationAdded="snackbar = true"/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import AddLocation from './AddLocation'

export default {
  components: { AddLocation },
  data() {
    return {
      userName: 'Simon Sigur',
      drawer: true,
      links: [
        { icon: 'home', text: 'Home', route: '/' },
      ],
      snackbar: false
    }
  }
}
</script>

<style>

</style>
