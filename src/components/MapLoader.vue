<template>
    <div class="maploader-container container-fluid">
        <l-map
            :zoom="zoom"
            :center="theCenter"
        >
            <l-tile-layer
                :url="url"
            />
            <l-marker
                :lat-lng="theCenter"
            >

            </l-marker>
        </l-map>
    </div>
</template>

<script>
import { latLng } from 'leaflet'

export default {
    name: 'MapLoader',
    props:['coordinates'],
    data: function(){
        return {
            url:'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            zoom:13
        }
    },
    computed:{
        theCenter: function theCenter(){
            var self = this;
            if(self.coordinates == null || self.coordinates == undefined) return latLng(0, 0);
            return latLng(self.coordinates[0], self.coordinates[1]);
        }
    }
}

</script>

<style scoped>

.maploader-container{
    height: 71vh;
    width:100%;
}

</style>