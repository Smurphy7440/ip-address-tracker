<template>
  <div class="home container-fluid gx-0">
      <b-jumbotron bg-variant="info" text-variant="white" boarder-variant="dark" class="row justify-content-center position-relative jumbo">
        <div class="container-fluid jumbo-container">
          <div class="row justify-content-center mt-4" style="text-align:center;">
            <span class="col-sm-3 app-title">IP Address Tracker</span>
          </div>
          <div class="row justify-content-center mb-5 mt-5">
            <div class="col-sm-3 address-input-field">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for any IP or domain" aria-describedby="basic-addon2" v-model="field_input">
                <div class="input-group-append">
                  <button class="btn btn-dark" type="button" v-on:click="makeCall"><img src="../assets/images/icon-arrow.svg"/></button>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-8">
              <div class="container-fluid position-relative ip-details" style="color:black;background-color:white;border:1px solid #d4d4d4;">
                <div class="row justify-content-center mt-4 ml-4 mr-4 mb-4">
                  <div class="col-sm-3 ip-address mb-2" align="center">
                    <h6>IP ADDRESS</h6>
                    <h4>{{initialIP}}</h4>
                  </div>
                  <div class="col-sm-3 location mb-2" align="center">
                    <h6>LOCATION</h6>
                    <h4>{{location}}</h4>
                  </div>
                  <div class="col-sm-3 timezone mb-2" align="center">
                    <h6>TIMEZONE</h6>
                    <h4>{{timezone}}</h4>
                  </div>
                  <div class="col-sm-3 isp" align="center">
                    <h6>ISP</h6>
                    <h4>{{isp}}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-jumbotron>
      <div class="row map-row gx-0">
        <div class="col-sm-12 map-column">
          <MapLoader class="the-map" :coordinates="coordinates" />
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapLoader from '@/components/MapLoader.vue';
const publicIP = require('public-ip');
const axios = require('axios');

export default {
  name: 'Home',
  components:{
    MapLoader
  },
  data:function(){
    return{
      field_input:"",
      myIP:"",
      API_KEY:'at_CMR4vUcjX1QaSbj1YmyHiOSMykJ7i',
      location:"",
      timezone:"",
      isp:"",
      coordinates:[0, 0]
    }
  },
  methods:{
    makeCall:function makeCall(){
      // Make API call to get the data of the input IP
      console.log("makeCall ran");
      var self = this;
      if(self.validIP()){
        axios.get(`https://geo.ipify.org/api/v1?apiKey=${self.API_KEY}&ipAddress=${self.field_input}`)
        .then(function(data){
          //console.log(data);
          self.myIP = self.field_input;
           self.location = `${data.data.location.region}, ${data.data.location.country}`;
           self.timezone = `UTC${data.data.location.timezone}`;
           self.isp = data.data.as.name;
           self.coordinates = [data.data.location.lat, data.data.location.lng];
           self.field_input = "";
          
        })
        .catch(function(error){
          console.log("An Error has occured:", error);
        })
      }else{
        axios.get(`https://geo.ipify.org/api/v1?apiKey=${self.API_KEY}&domain=${self.field_input}`)
        .then(function(data){
          console.log(data.data);
          self.myIP = data.data.ip;
          self.location = `${data.data.location.region}, ${data.data.location.country}`;
          self.timezone = `UTC${data.data.location.timezone}`;
          self.isp = data.data.as.name;
          self.coordinates = [data.data.location.lat, data.data.location.lng];
          self.field_input = "";
          
        })
        .catch(function(error){
          console.log("An Error has occured:", error);
        })
      }
    },
    validIP:function validIP(){
      var self = this;
      if(self.field_input == "") return false;
      if(self.field_input.split(".").length == 4){
        self.field_input.split(".").forEach(function(value){
          if(value > 255 || value < 0 ) return false;
        })
      }else{
        return false;
      }
    }

  },
  computed:{
    initialIP:function initialIP(){
      var self = this;
      return self.myIP;
    }
  },
  async beforeMount(){
    var self = this;
    self.myIP =  await publicIP.v4();
  },
  mounted(){
    // Make an API call to get the Location, Timezone and ISP of the initial (myIP) IP
    //console.log("Mount ran...");
    var self = this;
    axios.get(`https://geo.ipify.org/api/v1?apiKey=${self.API_KEY}&ipAddress=${self.myIP}`)
    .then(function(data){
      //console.log(data.data.location);
      self.location = `${data.data.location.region}, ${data.data.location.country}`;
      self.timezone = `UTC${data.data.location.timezone}`;
      self.isp = data.data.as.name;
      self.coordinates = [data.data.location.lat, data.data.location.lng];
    })
    .catch(function(error){
      console.log("An Error has occured:", error);
    })
  }
}
</script>

<style scoped>

.app-title{
  font-size: 25px;
  font-weight: bolder;
}
.jumbo{
  background-image: url('../assets/images/pattern-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  width:100vw;
  z-index:100;

}
.ip-details{
  bottom: -50%;
  border-radius: 10px;
}
.ip-address, .location, .timezone{
  border-right: 1px solid #d4d4d4;
}
.col-sm-3 h6{
  color: #bebebe;
}
.ip-address h4, .timezone h4, .location h4, .isp h4{
  margin: auto 0;
}
.map-column{
  z-index:0;

}
.map-row{
  margin-left:0px;
  margin-right:0px;
  width:100%;
}
.home{
  height:100vh;
}

</style>

<!--

  Notes:
   - Remove the margin-right style on mobile view.
-->
