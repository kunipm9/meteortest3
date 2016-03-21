var KEY_ENTER, defaults, initTemplateAndGoogleMaps;

KEY_ENTER = 13;

defaults = {
  mapType: 'roadmap',
  defaultLat: 0,
  defaultLng: 0,
  geolocation: false,
  searchBox: false,
  autolocate: false,
  zoom: 12,
  scrollwheel: false,
};

AutoForm.addInputType('map', {
  template: 'afMap',
  valueOut: function() {
    var lat, lng, node;
    node = $(this.context);
    lat = node.find('.js-lat').val();
    lng = node.find('.js-lng').val();
    if (lat.length > 0 && lng.length > 0) {
      return {
        lat: lat,
        lng: lng
      };
    }
  },
  contextAdjust: function(ctx) {
    ctx.loading = new ReactiveVar(false);
    return ctx;
  },
  valueConverters: {
    string: function(value) {
      if (this.attr('reverse')) {
        return value.lng + "," + value.lat;
      } else {
        return value.lat + "," + value.lng;
      }
    },
    numberArray: function(value) {
      return [value.lng, value.lat];
    }
  }
});

Template.afMap.created = function() {
  this.mapReady = new ReactiveVar(false);
  GoogleMaps.load({
    libraries: 'places'
  });
  this._stopInterceptValue = false;
  return this._interceptValue = function(ctx) {
    var location, t;
    t = Template.instance();
    if (t.mapReady.get() && ctx.value && !t._stopInterceptValue) {
      location = typeof ctx.value === 'string' ? ctx.value.split(',') : ctx.value.hasOwnProperty('lat') ? [ctx.value.lat, ctx.value.lng] : [ctx.value[1], ctx.value[0]];
      _location = new google.maps.LatLng(parseFloat(location[0]), parseFloat(location[1]));

      setTimeout(function() {
        t.setMarker(t.map, _location, t.options.zoom);
//console.log("setCenter location 1");
//console.log(_location);
//console.log(location[0]);
//console.log(location[1]);
        t.map.setCenter(_location);
      }, 1000);
      return t._stopInterceptValue = true;
    }
  };
};

initTemplateAndGoogleMaps = function() {
  var input, mapOptions, searchBox;
//console.log("initTemplateAndGoogleMaps");
//console.log(this);
//console.log(this.data);
//console.log(this.data.atts);
  this.options = _.extend({}, defaults, this.data.atts);
  this.data.marker = void 0;
  this.setMarker = (function(_this) {
    return function(map, location, zoom) {
      if (zoom == null) {
        zoom = 0;
      }
      _this.$('.js-lat').val(location.lat());
      _this.$('.js-lng').val(location.lng());
      if (_this.data.marker) {
        _this.data.marker.setMap(null);
      }
      _this.data.marker = new google.maps.Marker({
        position: location,
        map: map
      });
      if (zoom > 0) {
        return _this.map.setZoom(zoom);
      }
    };
  })(this);
  mapOptions = {
    zoom: 0,
    mapTypeId: google.maps.MapTypeId[this.options.mapType],
    streetViewControl: false,
    scrollwheel: this.options.scrollwheel,
  };
  if (this.data.atts.googleMap) {
    _.extend(mapOptions, this.data.atts.googleMap);
  }
  this.map = new google.maps.Map(this.find('.js-map'), mapOptions);
//console.log("this.options");
//console.log(this.options);
  var location = new google.maps.LatLng(this.options.defaultLat, this.options.defaultLng);
//console.log("setCenter location 2");
//console.log(location);
  this.map.setCenter(location);
  this.map.setZoom(this.options.zoom);
  if (this.data.atts.searchBox) {
    input = this.find('.js-search');
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    searchBox = new google.maps.places.SearchBox(input);
    google.maps.event.addListener(searchBox, 'places_changed', (function(_this) {
      return function() {
        var location;
        location = searchBox.getPlaces()[0].geometry.location;
        _this.setMarker(_this.map, location);
//console.log("setCenter location 3");
//console.log(location);
        return _this.map.setCenter(location);
      };
    })(this));
    $(input).removeClass('af-map-search-box-hidden');
  }
  if (this.data.atts.autolocate && navigator.geolocation && !this.data.value) {
    navigator.geolocation.getCurrentPosition((function(_this) {
      return function(position) {
        var location;
        location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        _this.setMarker(_this.map, location, _this.options.zoom);
//console.log("setCenter location 4");
//console.log(location);
        return _this.map.setCenter(location);
      };
    })(this));
  }
  if (typeof this.data.atts.rendered === 'function') {
    this.data.atts.rendered(this.map);
  }
  google.maps.event.addListener(this.map, 'rightclick', (function(_this) {
    return function(e) {
      mapEdit = $(_this.firstNode).find('.js-map-edit input').prop('checked');
      if (mapEdit) {
        return _this.setMarker(_this.map, e.latLng);
      } else {
        return true;
      }
    };
  })(this));
  this.$('.js-map').closest('form').on('reset', (function(_this) {
    return function() {
      var ref;
      _this.data.marker && _this.data.marker.setMap(null);
      var location = new google.maps.LatLng(_this.options.defaultLat, _this.options.defaultLng);
//console.log("setCenter location 5");
//console.log(location);
      _this.map.setCenter(location);
      return _this.map.setZoom(((ref = _this.options) != null ? ref.zoom : void 0) || 0);
    };
  })(this));
  return this.mapReady.set(true);
};

Template.afMap.rendered = function() {
  return this.autorun((function(_this) {
    return function() {
      return GoogleMaps.loaded() && initTemplateAndGoogleMaps.apply(_this);
    };
  })(this));
};

Template.afMap.helpers({
  schemaKey: function() {
    Template.instance()._interceptValue(this);
    return this.atts['data-schema-key'];
  },
  width: function() {
    if (typeof this.atts.width === 'string') {
      return this.atts.width;
    } else if (typeof this.atts.width === 'number') {
      return this.atts.width + 'px';
    } else {
      return '100%';
    }
  },
  height: function() {
    if (typeof this.atts.height === 'string') {
      return this.atts.height;
    } else if (typeof this.atts.height === 'number') {
      return this.atts.height + 'px';
    } else {
      return '500px';
    }
  },
  loading: function() {
    return this.loading.get();
  }
});

Template.afMap.events({
  'click .js-map': function(e, t) {
    e.preventDefault();
    if (!navigator.geolocation) {
      return false;
    }

    if (t.resized == undefined) {
      mapEdit = $(t.firstNode).find('.js-map-edit input');
      $(mapEdit).bootstrapToggle({
        height: 24,
        width: 90,
        on: '編集ON&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        off: '編集OFF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      });

//console.log("google.maps resize");
      google.maps.event.trigger(t.map, 'resize');
      t.resized = true;
      var location;
//console.log(this);
      if (this.value) {
        location = new google.maps.LatLng(this.value.lat, this.value.lng);
      } else {
        location = new google.maps.LatLng(this.atts.defaultLat, this.atts.defaultLng);
      }
//console.log("setCenter location 6");
      setTimeout(function() {
        t.map.setCenter(location);
      }, 200);
    }
    //return true;
  },
  'click .js-locate': function(e, t) {
    e.preventDefault();
    if (!navigator.geolocation) {
      return false;
    }
    this.loading.set(true);
    return navigator.geolocation.getCurrentPosition((function(_this) {
      return function(position) {
        var location;
        location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        _this.setMarker(_this.map, location, _this.options.zoom);
//console.log("setCenter location 6");
//console.log(location);
        _this.map.setCenter(location);
        return _this.loading.set(false);
      };
    })(this));
  },
  'keydown .js-search': function(e) {
    if (e.keyCode === KEY_ENTER) {
      return e.preventDefault();
    }
  },
  'click .js-map-edit': function(e, t) {
    setTimeout(function() {
      mapEdit = $(t.firstNode).find('.js-map-edit input').prop('checked');
      span = $(t.firstNode).find('.js-map-edit span.js-map-edit-span');
      if (mapEdit) {
        $(span).show();
      } else {
        $(span).hide();
      }
    });
  },
});
