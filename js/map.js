 // Initialize the platform object:
      var platform = new H.service.Platform({
        'apikey': 'Vt4QTRVwcF2R6HRO2qsGMpOpZJjieecpCsI9MVEWbQk'
      });

      // Obtain the default map types from the platform object
      var maptypes = platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
          zoom: 10,
          center: { lng: 13.4, lat: 52.51 }
        });