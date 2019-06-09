<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn flat slot="activator" class="success">Add Location</v-btn>
    <v-card>
       <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="submit" :loading="loading">Save</v-btn>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Cancel</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="SiteFac_Name" label="Location name" prepend-icon="domain" :rules="inputRules"></v-text-field>
          <v-text-field v-model="SiteFac_Address" label="Address" prepend-icon="location_on" :rules="inputRules"></v-text-field>
          <v-text-field v-model="SiteFac_City" label="City" prepend-icon="location_on" :rules="inputRules"></v-text-field>
          <v-text-field v-model="SiteFac_Country" label="Country" prepend-icon="location_on" :rules="inputRules"></v-text-field>
          <v-text-field v-model="SiteFac_ZipCode" label="Zipcode" prepend-icon="location_on"></v-text-field>
          <v-text-field v-model="SiteFac_Leader" label="Site Leader" prepend-icon="perm_identity" :rules="inputRules"></v-text-field>
          <v-text-field v-model="SiteFac_QALeader" label="Site QA Leader" prepend-icon="perm_identity" :rules="inputRules"></v-text-field>
          

          <!-- <v-menu v-model="menu" :close-on-content-click="false">
            <v-text-field slot="activator" :rules="inputRules"
              :value="formattedDate" clearable label="Due date" prepend-icon="date_range">
            </v-text-field>
            <v-date-picker v-model="due" @change="menu = false"></v-date-picker>
          </v-menu> -->

          <v-spacer></v-spacer>

          <!-- <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Add Location</v-btn> -->
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import format from 'date-fns/format'
import db from '@/fb'

export default {
  data() {
    return {
      SiteFac_Name: '',
      SiteFac_Address: '',
      SiteFac_City: '',
      SiteFac_Country: '',
      SiteFac_ZipCode: '',
      SiteFac_Leader: '',
      SiteFac_QALeader: '',      
      inputRules: [
        v => !!v || 'This field is required',
        // v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const siteLocation = {
          SiteFac_Name: this.SiteFac_Name,
          SiteFac_Address: this.SiteFac_Address,
          SiteFac_City: this.SiteFac_City,
          SiteFac_Country: this.SiteFac_Country,
          SiteFac_ZipCode: this.SiteFac_ZipCode,
          SiteFac_Leader: this.SiteFac_Leader,
          SiteFac_QALeader: this.SiteFac_QALeader,
        }

        db.collection('SiteFacility_Info').add(siteLocation).then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit('locationAdded')
        })
      }
    }
  },
  // computed: {
  //   formattedDate () {
  //     console.log(this.due)
  //     return this.due ? format(this.due, 'Do MMM YYYY') : ''
  //   }
  // }
}
</script>
