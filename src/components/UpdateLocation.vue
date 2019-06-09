<template>
  <v-dialog v-model="dialog" max-width="500px">
        <v-icon slot="activator" small class="mr-2" >edit</v-icon>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="SiteFac_Name" label="Location name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="SiteFac_Address" label="Address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="SiteFac_City" label="City"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="SiteFac_Country" label="Country"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="SiteFac_ZipCode" label="Zipcode"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="SiteFac_Leader" label="Site Leader"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="SiteFac_QALeader" label="Site QA Leader"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import db from '@/fb'

export default {
  data () {
    return {
      dialog: false,
      SiteFacility_Info: [], 
      editedIndex: -1,
      editedItem: {
        SiteFac_Name: '',
        SiteFac_Address: '',
        SiteFac_City: '',
        SiteFac_Country: '',
        SiteFac_ZipCode: 0,
        SiteFac_Leader: '',
        SiteFac_QALeader: ''
      },
      defaultItem: {
        SiteFac_Name: '',
        SiteFac_Address: '',
        SiteFac_City: '',
        SiteFac_Country: '',
        SiteFac_ZipCode: 0,
        SiteFac_Leader: '',
        SiteFac_QALeader: ''
      },
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Location' : 'Edit Location'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    initialize () {
      this.SiteFacility_Info = []
    },
     close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.SiteFacility_Info[this.editedIndex], this.editedItem)
      } else {
        this.SiteFacility_Info.push(this.editedItem)
      }
      this.close()
    },
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const siteLocationID = _id

        db.collection('SiteFacility_Info').update(siteLocationID).then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit('locationUpdated')
        })
      }
  },
  created () {
    this.initialize();
  }
}
}
</script>

<style>

</style>