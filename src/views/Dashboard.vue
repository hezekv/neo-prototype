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
            <v-icon class="primary--text">close</v-icon>
          </v-btn>
          <v-toolbar-title class="primary--text">Update Location - {{ editedItem.SiteFac_Name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="save" class="primary--text">Update</v-btn>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false" class="primary--text">Cancel</v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap class="ml-5">
                <v-flex xs12 sm6 pa-4 md5 class="ma-4 add-location-form">
                  <v-subheader><p class="mb-3">Site Administrator</p></v-subheader>
                  <v-text-field v-model="editedItem.SiteFac_Name" label="Location name" prepend-icon="domain" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Address" label="Address" prepend-icon="location_on" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_City" label="City" prepend-icon="location_on" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Country" label="Country" prepend-icon="location_on" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_ZipCode" label="Zipcode" prepend-icon="location_on" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Leader" label="Site Leader" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_QALeader" label="Site QA Leader" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                </v-flex>
                
                <v-flex xs12 sm6 pa-4 md5 class="ma-4 add-location-form">
                  <v-subheader>
                      <p class="mb-3">Site Personnel</p>
                  </v-subheader>
                  <v-text-field v-model="editedItem.SiteFac_Headcount" label="Headcount" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Production" label="Production" prepend-icon="perm_identity" hint="(DL - H/S)" class="mb-3">
                  </v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Quality" label="Quality" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_EngrTechnical" label="Site QA Leader" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Management" label="Management" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                </v-flex>

                <!-- site capabilities -->
                <v-flex xs12 sm6 pa-4 md5 class="ma-4 add-location-form">
                  <v-subheader><p class="mb-0">Site Facility</p></v-subheader>
                  <v-text-field v-model="editedItem.SiteFac_TotalPlantSQ" label="Total Plant" prepend-icon="perm_identity" hint="Sq Ft/M" class="mb-5"></v-text-field>

                  <v-subheader><p class="mb-0">Site Capabilities</p></v-subheader>
                  <v-text-field v-model="editedItem.SiteFac_Machining" label="Machining" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Painting" label="Painting" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_HeatTreat" label="Heat Treat" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Welding" label="Welding" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Hydro" label="Hydro" prepend-icon="perm_identity" class="mb-5"></v-text-field>

                  <v-subheader><p class="mb-0">NDE Capabilities</p></v-subheader>
                  <v-text-field v-model="editedItem.SiteFac_FuncTesting" label="Functional Testing" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Radiograph" label="Radiograph" prepend-icon="perm_identity" hint="(RT)" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Ultrasonic" label="Ultrasonic" prepend-icon="perm_identity" hint="(UT)" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Penetrant" label="Penetrant" prepend-icon="perm_identity" hint="(PT)" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_MagnetParticle" label="Magnetic Particle" prepend-icon="perm_identity" hint="(MT)" class="mb-3"></v-text-field>
                </v-flex>

                <!-- site capacity -->
                <v-flex xs12 sm6 pa-4 md5 class="ma-4 add-location-form">
                  <v-subheader>
                      <p class="mb-0">Site Capacity</p>
                  </v-subheader>
                  <v-text-field v-model="editedItem.SiteFac_Visualinspection" label="Visual" prepend-icon="perm_identity" hint="(VT)" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_CurrentCapacity" label="Current capacity" prepend-icon="perm_identity"
                      hint="(% Loaded of expected Capacity)" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_NumOfShifts" label="Number of Shifts" prepend-icon="perm_identity" class="mb-5"></v-text-field>

                  <v-subheader>
                      <p class="mb-0">Site Quality</p>
                  </v-subheader>
                  <v-text-field v-model="editedItem.SiteFac_ProdListing" label="Product listing" prepend-icon="perm_identity"
                      hint="(size, pressure, etc..)" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_Certifications" label="3rd Party Certificaitons" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_QualityManual" label="Quality Manual" prepend-icon="perm_identity" class="mb-3"></v-text-field>
                  <v-text-field v-model="editedItem.SiteFac_CalibrationProgram" label="M&amp;TE Calibration Program" prepend-icon="perm_identity"
                      hint="(YES / NO)" class="mb-3"></v-text-field>
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
  
  .v-text-field .v-label {
    top: 2px;
  }
</style>
