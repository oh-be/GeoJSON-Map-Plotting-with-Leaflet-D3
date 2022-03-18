Cleck out my live Leaflet Visualization [here](https://oh-be.github.io/GeoJSON-Map-Plotting-with-Leaflet-D3/) !!

# Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

### Plotting the Data

![2-BasicMap](Images/2-BasicMap.png)

Here's a screenshot of an earthquake data set used during production. Note: on the live [webpage](https://oh-be.github.io/GeoJSON-Map-Plotting-with-Leaflet-D3/), this data is live (previous 7 days).

1. **Getting the data**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. On the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page we can pick a data set to visualize. When you click on a data set, for my example "All Earthquakes from the Past 7 Days", you will be given a JSON representation of that data. I use the URL of this JSON to pull in the data for our visualization.
   - Below is a screenshot of the data set in it's geoJSON format (API page) 

   ![4-JSON](Images/4-JSON.png)

2. **Importing & Visualizing the Data**

   I created a map using Leaflet that plots any recorded earthquakes as circle's on a map that are based on coordinates (longitude and latitude) that are given in the data set.

   * Data markers reflect the magnitude of the earthquake by their size. The depth of the earthquake is reflected by its color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

   * **Note:** The depth of the earth can be found as the third coordinate for each earthquake (in this particular geoJSON api).

   * Popups that provide additional information about the earthquake are included when a marker is clicked.

   * The legend provides context for the map data.

- - -

### More Data (adding tectonic plates data / divisions)

![5-Advanced](Images/5-Advanced.png)

Added a map layer to illustrate the relationship between tectonic plates and seismic activity. The second data set is set alongside the original set of data. For geoJSON on tectonic plates go [here](<https://github.com/fraxen/tectonicplates>).

* Ploted second data set on original map.

* Added base maps to separate each data sets into overlays that can be turned on and off independently.

* Added layer controls to map.

- - -
