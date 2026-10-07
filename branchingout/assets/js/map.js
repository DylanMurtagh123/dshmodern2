
  // Coverage area map — centred on Maidstone, Kent
  (function(){
    // Rough, illustrative outline only (not an official boundary)
    var coverageOutline = [[51.345,0.180],[51.395,0.330],[51.400,0.520],[51.375,0.660],[51.320,0.760],
      [51.250,0.880],[51.175,0.870],[51.130,0.760],[51.115,0.630],[51.130,0.500],
      [51.115,0.400],[51.120,0.280],[51.150,0.190],[51.210,0.150],[51.280,0.140],[51.345,0.180]];

    var towns = [
      { name:"Maidstone", coords:[51.2704, 0.5227], accent:true },
      { name:"Bearsted", coords:[51.2745, 0.5666] },
      { name:"Detling", coords:[51.3011, 0.5589] },
      { name:"Loose", coords:[51.2465, 0.5219] },
      { name:"Boughton Monchelsea", coords:[51.2331, 0.5424] },
      { name:"Aylesford", coords:[51.3010, 0.4802], accent:true },
      { name:"West Malling", coords:[51.2884, 0.4084], accent:true },
      { name:"Larkfield", coords:[51.3013, 0.4283] },
      { name:"Barming", coords:[51.2721, 0.4934] },
      { name:"East Farleigh", coords:[51.2543, 0.4949] },
      { name:"Coxheath", coords:[51.2361, 0.4989] },
      { name:"Marden", coords:[51.1783, 0.5027] },
      { name:"Staplehurst", coords:[51.1554, 0.5729] },
      { name:"Headcorn", coords:[51.1601, 0.6363] },
      { name:"Sittingbourne", coords:[51.3417, 0.7333], accent:true },
      { name:"Ashford", coords:[51.1465, 0.8724], accent:true },
      { name:"Tonbridge", coords:[51.1936, 0.2761], accent:true },
      { name:"Rochester", coords:[51.3886, 0.5024] },
      { name:"Sevenoaks", coords:[51.2716, 0.1878] }
    ];

    function initCoverageMap(){
      var mapEl = document.getElementById('coverage-map');
      if (!mapEl || !window.L) return;

      var map = L.map('coverage-map', {
        scrollWheelZoom:false,
        zoomControl:true,
        attributionControl:true
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom:18,
        subdomains:'abcd'
      }).addTo(map);

      map.fitBounds(L.latLngBounds(towns.map(function(t){ return t.coords; })), { padding:[30,30] });

      // enable scroll-zoom only once someone actually clicks into the map,
      // so it doesn't trap the page scroll
      map.on('click', function(){ map.scrollWheelZoom.enable(); });
      mapEl.addEventListener('mouseleave', function(){ map.scrollWheelZoom.disable(); });

      towns.forEach(function(t){
        var icon = L.divIcon({
          className:'',
          html:'<div class="map-pin' + (t.accent ? ' accent' : '') + '"></div>',
          iconSize: t.accent ? [16,16] : [11,11],
          iconAnchor: t.accent ? [8,8] : [5.5,5.5]
        });
        L.marker(t.coords, { icon:icon, keyboard:false })
          .addTo(map)
          .bindTooltip(t.name, { permanent:true, direction:'right', offset:[9,0], className:'map-tooltip' });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCoverageMap);
    } else {
      initCoverageMap();
    }
  })();
