---
layout: post
author: Korede Aderele
author_link: https://twitter.com/korede_ta
published: true
---

## Introduction

66% percent of Lagos' population lives in slums. This map visualizes where these populations are located, as a way to make visible these communities and the issues facing them. Some of these issues include displacement and disbursement by state authorities, as well as fires, sanitation concerns, electrification and flooding.

Lagos slums include, Makoko (the infamous floating slum),

https://www.npr.org/sections/goatsandsoda/2017/05/15/528461093/slum-dwellers-in-africas-biggest-megacity-are-now-living-in-canoes

<div id="lagos-slums-map" class="MAP"></div>

## Why Slums are Important
Slums in some form or the other are common to urban areas all around the world. 
A better term for slums might be "unplanned" or "organic" urban settlements, which are settlements which form when migrants to a city or displaced people build their own settlements 
from scratch because formal housing is too expensive and the government is unable to provide sufficient housing for these groups. 
Slums are often heavily populated, lack public services and don't offer long-term tenure.

Many urban researchers view slums as central to cities life forces and a bastion of equality in a sense since people can take it upon themselves to plan out and construct their own enclaves within the matrix of a city. But slums are generally considered to be illegal in cities because the government does not approve them prior to their construction, hence they might be demolished or otherwise penalized by the government. Researchers like [Eugenie L Birch](https://www.design.upenn.edu/city-regional-planning/phd/people/eugenie-l-birch) have argued that cities would be better off embracing slums and empowering residents to build more sanitary lodgings that are more resistant to fire and flooding. In addition to this, slums can be recognized as legitimate settlements and receive investments to build schools, libraries and other community resources.

Alternative settlements in slums can also be models of more sustainable architecture. Slum dwellings in cities like Medellin in Colombia. Medellin is also a good example of integrating city infrastructure and amenities like cable cars that take residents to the center of the city and well-situated community spaces.

Indeed, slums can be looked at as an opportunity to innovatively support large underserved communities in cities like Lagos. As urban populations grow in the developing world

## How You Can Advocate for Lagos Slums

## Learn More


<!-- ----------------------------------------------------------------- -->

<script>
// var map = L.map('lagos-slums-map').setView([6.5244, 3.3792], 13);
// 
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);


/*
L.marker([51.5, -0.09]).addTo(map)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup();
*/
</script>

<script>
  mapboxgl.accessToken = 'pk.eyJ1Ijoia29yZWRlc21hcHMiLCJhIjoiY2tkbmhpdTBiMGMwZTJ6cHlpN2ppbG5jMyJ9.d7dW9A4fq2_qz0EKv3ofqA';
  var map = new mapboxgl.Map({
    container: 'lagos-slums-map',
    center: [6, 5],
    zoom: 5,
    style: 'mapbox://styles/mapbox/streets-v11'
  });
</script>

<style>
</style>
