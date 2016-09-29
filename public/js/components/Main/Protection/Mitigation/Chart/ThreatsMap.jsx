var React = require('react')
var Palette = require('google-material-color')

var style = {
  width: '715px',
  height: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '80px'
};

var MitigationMap = React.createClass({

  setColor: function( map ){
    for( var  country in map ){
      if( typeof map[country] !== 'function' ){

        let count = map[country]['count']

        if( count > 0 && count < 10 ){
          map[country]['fillKey'] = 'color1'
        }
        else if( count >= 10 && count < 300  ){
          map[country]['fillKey'] = 'color2'
        }
        else if( count >= 300 && count < 700  ){
          map[country]['fillKey'] = 'color3'
        }
        else if( count >= 700 && count < 1000  ){
          map[country]['fillKey'] = 'color4'
        }
        else if( count >= 1000 ){
          map[country]['fillKey'] = 'color5'
        }
      }
    }
  },

  componentDidMount: function(){

    var map = this.props.data

    this.setColor(map)

    this.map =  new Datamap(

        {
          element: document.getElementById('mitigation-map'),

          projection: 'mercator',

          fills: {
              defaultFill: "#F2F2F2",
              // authorHasTraveledTo: "#fa0fa0",
              // USA: "red"
              color1: Palette.get('Red', '50'),
              color2: Palette.get('Red', '100'),
              color3: Palette.get('Red', '200'),
              color4: Palette.get('Red', '300'),
              color5: Palette.get('Red', '500')
            },

            geographyConfig: {

                borderWidth: 1,
                borderColor: '#D7D7D7',

                popupTemplate: function(geography, data) {
                  // console.log(geography)
              if( !data ) return

              data = data.count || 0

              return '<div class="hoverinfo">' + geography.properties.name + '<br/>' +
              'Treats: ' +  data + ' '
              }
            },

            data: map   
            }
      );
  },

  componentDidUpdate: function(){

    var map = this.props.data

    this.setColor(map)
    this.resetMap()
    this.map.updateChoropleth( map );
  },

  resetMap: function(){
    this.map.updateChoropleth(null, {reset: true})
  },

  color: function(){
    this.map.updateChoropleth({ USA: Palette.get('Red', '500'), CHN: Palette.get('Red', '300')});
  },

  render: function(){
      return (
        <div id="mitigation-map" style={style}></div>
      );
    }
});

module.exports = MitigationMap;