<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-flex class="mt-4 mb-3">
        <AddLocation @locationAdded="snackbar = true"/>
      </v-flex>
      <v-card>
        <v-card-title primary-title>
          <h4 class="headline mb-0">Site Safety and Quality Information</h4>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </v-card>
       <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Update Location</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="submit" :loading="loading">Update</v-btn>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Cancel</v-btn>
          </v-toolbar-items>
        </v-toolbar>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
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
      <v-progress-linear v-slot:progress primary indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <td>{{ props.item.SiteFac_City }}</td>
        <td>{{ props.item.SiteFac_Name }}</td>
        <td>{{ props.item.SiteFac_Address }}, {{ props.item.SiteFac_City }} {{ props.item.SiteFac_ZipCode }}  {{ props.item.SiteFac_Country }}</td>
        <td>{{ props.item.SiteFac_Leader }}</td>
        <td>{{ props.item.SiteFac_QALeader }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
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
import db from '@/fb'
import AddLocation from '../components/AddLocation'

export default {
  components: { AddLocation },
  data() {
    return {
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
      }
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
    sortBy(prop) {
      this.SiteFacility_Info.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    initialize () {
      this.SiteFacility_Info = []
    },
    editItem (item) {
      this.editedIndex = this.SiteFacility_Info.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.SiteFacility_Info.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.SiteFacility_Info.splice(index, 1)
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
