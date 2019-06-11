<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-btn flat slot="activator" class="success">Add Location</v-btn>
    <v-card>
       <v-toolbar dark color="success">
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
    
        <v-form class="px-3" ref="form">
          <v-container>
            <v-layout wrap>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Name" label="Location name" prepend-icon="domain" :rules="inputRules"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Address" label="Address" prepend-icon="location_on" :rules="inputRules"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_City" label="City" prepend-icon="location_on" :rules="inputRules"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Country" label="Country" prepend-icon="location_on" :rules="inputRules"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_ZipCode" label="Zipcode" prepend-icon="location_on"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Leader" label="Site Leader" prepend-icon="perm_identity" :rules="inputRules"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_QALeader" label="Site QA Leader" prepend-icon="perm_identity" :rules="inputRules"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Headcount" label="Headcount" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Production" label="Production" prepend-icon="perm_identity" hint="(DL - H/S)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Quality" label="Quality" prepend-icon="perm_identity" ></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_EngrTechnical" label="Site QA Leader" prepend-icon="perm_identity" ></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Management" label="Management" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_TotalPlantSQ" label="Total Plant" prepend-icon="perm_identity" hint="Sq Ft/M"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Machining" label="Machining" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Painting" label="Painting" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_HeatTreat" label="Heat Treat" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Welding" label="Welding" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Hydro" label="Hydro" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_FuncTesting" label="Functional Testing" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Radiograph" label="Radiograph" prepend-icon="perm_identity" hint="(RT)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Ultrasonic" label="Ultrasonic" prepend-icon="perm_identity" hint="(UT)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Penetrant" label="Penetrant" prepend-icon="perm_identity" hint="(PT)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_MagnetParticle" label="Magnetic Particle" prepend-icon="perm_identity" hint="(MT)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Visualinspection" label="Visual" prepend-icon="perm_identity" hint="(VT)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_CurrentCapacity" label="Current capacity" prepend-icon="perm_identity" hint="(% Loaded of expected Capacity)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_NumOfShifts" label="Number of Shifts" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_ProdListing" label="Product listing" prepend-icon="perm_identity" hint="(size, pressure, etc..)"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_Certifications" label="3rd Party Certificaitons" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_QualityManual" label="Quality Manual" prepend-icon="perm_identity"></v-text-field></v-flex>
              <v-flex xs12 sm6 md4><v-text-field v-model="SiteFac_CalibrationProgram" label="M&amp;TE Calibration Program" prepend-icon="perm_identity" hint="(YES / NO)"></v-text-field></v-flex>              <!-- <v-menu v-model="menu" :close-on-content-click="false">
              <v-text-field slot="activator" :rules="inputRules"
                  :value="formattedDate" clearable label="Due date" prepend-icon="date_range">
                </v-text-field>
                <v-date-picker v-model="due" @change="menu = false"></v-date-picker>
              </v-menu> -->

              <v-spacer></v-spacer>
            </v-layout>
          </v-container>
        </v-form>
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
      SiteFac_Headcount: '',
      SiteFac_Production: '',
      SiteFac_Quality: '',
      SiteFac_EngrTechnical: '',
      SiteFac_Management: '',
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
          SiteFac_Headcount: thisSiteFac_Headcount,
          SiteFac_Production: this.SiteFac_Headcount,
          SiteFac_Quality: this.SiteFac_Quality,
          SiteFac_EngrTechnical: this.SiteFac_EngrTechnical,
          SiteFac_Management: this.SiteFac_Management,
          SiteFac_TotalPlantSQ: this.SiteFac_TotalPlantSQ,
          SiteFac_Machining: this.SiteFac_Machining,
          SiteFac_Painting: this.SiteFac_Painting,
          SiteFac_HeatTreat: this.SiteFac_HeatTreat,
          SiteFac_Welding: this.SiteFac_Welding,
          SiteFac_Hydro: this.SiteFac_Hydro,
          SiteFac_FuncTesting: this.SiteFac_FuncTesting,
          SiteFac_Radiograph: this.SiteFac_Radiograph,
          SiteFac_Ultrasonic: this.SiteFac_Ultrasonic,
          SiteFac_Penetrant: this.SiteFac_Penetrant,
          SiteFac_MagnetParticle: this.SiteFac_MagnetParticle,
          SiteFac_Visualinspection: this.SiteFac_Visualinspection,
          SiteFac_CurrentCapacity: this.SiteFac_CurrentCapacity,
          SiteFac_NumOfShifts: this.SiteFac_NumOfShifts,  
          SiteFac_ProdListing: this.SiteFac_ProdListing,
          SiteFac_Certifications: this.SiteFac_Certifications,
          SiteFac_QualityManual: this.SiteFac_QualityManual,
          SiteFac_CalibrationProgram: this.SiteFac_CalibrationProgram,
        }

        db.collection('SiteFacility_Info').add(siteLocation).then(() => {
          this.loading = false;
          this.dialog = false;
          this.form = '';
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
