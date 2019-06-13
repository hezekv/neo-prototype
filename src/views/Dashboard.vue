<template>
  <div class="dashboard">

    <v-container class="my-5">
      <h4 class="headline mb-4 primary--text">Site Safety and Quality Information</h4>
      <v-card>
        <v-card-title primary-title class="mb-2">
          <v-flex class="mt-2 mb-2">
            <AddLocation @locationAdded="snackbar = true"/>
          </v-flex>
          <v-spacer></v-spacer>          
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            class="pa-3"
          ></v-text-field>
        </v-card-title>
      </v-card>

       <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="info">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Update Location - {{ editedItem.SiteFac_Name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="save" >Update</v-btn>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Cancel</v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.SiteFac_Name" label="Location name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.SiteFac_Address" label="Address"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.SiteFac_City" label="City"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.SiteFac_Country" label="Country"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.SiteFac_ZipCode" label="Zipcode"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.SiteFac_Leader" label="Site Leader"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.SiteFac_QALeader" label="Site QA Leader"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions> -->
        </v-card>
      </v-dialog>

        <v-data-table  
        :headers="headers"
        :items="SiteFacility_Info"
        :search="search" 
        >
        <v-progress-linear v-model="value" :active="show" primary :indeterminate="query" :query="true"></v-progress-linear>
        <template v-slot:items="props">
          <td>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  class="mr-2"
                  color="info"
                  @click="updateItem(props.item)"
                  v-on="on"
                >
                  edit
                </v-icon>
              </template>
              <span>Edit Location</span>
            </v-tooltip>
          </td>
          <td>{{ props.item.SiteFac_City }}</td>
          <td>{{ props.item.SiteFac_Name }}</td>
          <td>{{ props.item.SiteFac_Address }}, {{ props.item.SiteFac_City }} {{ props.item.SiteFac_ZipCode }}  {{ props.item.SiteFac_Country }}</td>
          <td>{{ props.item.SiteFac_Leader }}</td>
          <td>{{ props.item.SiteFac_QALeader }}</td>
          <td class="justify-center layout px-0">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  class="mr-2"
                  color="info"
                  @click="updateItem(props.item)"
                  v-on="on"
                >
                  edit
                </v-icon>
              </template>
              <span>Edit Location</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  color="error"
                  @click="deleteItem(props.item)"
                  v-on="on"
                >
                  delete
                </v-icon>                
              </template>
              <span>Delete Location</span>
            </v-tooltip>
          </td>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-container>
   
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '@/fb'
import AddLocation from '../components/AddLocation'

const siteFacilityRefs = db.collection('SiteFacility_Info').doc();

export default {
  components: { AddLocation },
  data() {
    return {
      value: 0,
      query: false,
      show: true,
      interval: 0,
      snackbar: false,
      color: '',
      mode: '',
      timeout: 6000,
      text: 'Hello, I\'m a snackbar',
      dialog: false,
      delete: false,
      search: '',       
      headers: [
        { text: '', value: 'view_details', sortable: false },
        { text: 'Location', value: 'SiteFac_City' },
        { text: 'Legal Entity Name (Plant)', value: 'SiteFac_Name' },
        { text: 'Physical Address', value: 'SiteFacility_Address' },
        { text: 'Site Leader', value: 'SiteFac_Leader' },
        { text: 'Site QA Leader', value: 'SiteFac_QALeader' },
        { text: 'Actions', value: 'name', sortable: false }   
      ],
      SiteFacility_Info: [], 
      editedIndex: -1,
      editedItem: {
        SiteFac_Name: '',
        SiteFac_Address: '',
        SiteFac_City: '',
        SiteFac_Country: '',
        SiteFac_ZipCode: 0,
        SiteFac_Leader: '',
        SiteFac_QALeader: '',
        SiteFac_Headcount: '',
        SiteFac_Production: '',
        SiteFac_EngrTechnical: '',
        SiteFac_TotalPlantSQ: '',
        SiteFac_Machining: '',
        SiteFac_Painting: '',
        SiteFac_HeatTreat: '',
        SiteFac_Welding: '',
        SiteFac_Hydro: '',
        SiteFac_FuncTesting: '',
        SiteFac_Radiograph: '',
        SiteFac_Ultrasonic: '',
        SiteFac_Penetrant: '',
        SiteFac_MagnetParticle: '',
        SiteFac_Visualinspection: '',
        SiteFac_CurrentCapacity: '',
        SiteFac_NumOfShifts: '',  
        SiteFac_ProdListing: '',
        SiteFac_Certifications: '',
        SiteFac_QualityManual: '',
        SiteFac_CalibrationProgram: '',
      },
      defaultItem: {
        SiteFac_Name: '',
        SiteFac_Address: '',
        SiteFac_City: '',
        SiteFac_Country: '',
        SiteFac_ZipCode: 0,
        SiteFac_Leader: '',
        SiteFac_QALeader: '',
        SiteFac_Headcount: '',
        SiteFac_Production: '',
        SiteFac_EngrTechnical: '',
        SiteFac_TotalPlantSQ: '',
        SiteFac_Machining: '',
        SiteFac_Painting: '',
        SiteFac_HeatTreat: '',
        SiteFac_Welding: '',
        SiteFac_Hydro: '',
        SiteFac_FuncTesting: '',
        SiteFac_Radiograph: '',
        SiteFac_Ultrasonic: '',
        SiteFac_Penetrant: '',
        SiteFac_MagnetParticle: '',
        SiteFac_Visualinspection: '',
        SiteFac_CurrentCapacity: '',
        SiteFac_NumOfShifts: '',  
        SiteFac_ProdListing: '',
        SiteFac_Certifications: '',
        SiteFac_QualityManual: '',
        SiteFac_CalibrationProgram: ''
      }
    }
  },
  computed: {
    siteFacilityInfo() {
      return siteFacilityInfo = siteFacilityRefs
  },
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    sortBy(prop) {
      this.SiteFacility_Info.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    initialize () {
      this.SiteFacility_Info = []
    },
    updateItem (item) {
      this.editedIndex = this.SiteFacility_Info.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {      
      const index = this.SiteFacility_Info.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.SiteFacility_Info.splice(index, 1);
    },
    close () {
      this.dialog = false
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.SiteFacility_Info[this.editedIndex], this.editedItem)
      } else {
        this.SiteFacility_Info.push(this.editedItem)
      }
      this.close()
    }
  },
  created() {
    this.initialize();
    db.collection('SiteFacility_Info').onSnapshot(res => {
      const changes = res.docChanges();
      
      changes.forEach(change => {
        if (change.type === 'added') {
          this.SiteFacility_Info.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }  
}
</script>

<style>

</style>
