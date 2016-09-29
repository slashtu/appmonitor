
import React from 'react'
import shortId from 'shortid'

import ProgressBar from '../ProgressBar.jsx'
import css from './PercentBar.css'

let getData = function getData( data, barMaxWidth ){

  let barData = []

  let accRate = 0

  let total = 0

  // calculate total
  data.forEach( function( bar ){
    total += bar.count
  })

  data.forEach( function( bar, index ){

    if( bar.count === 0) return barData.push( { label: bar.label, count: 0, rate: 0, width: 0} )

    //last element
    if( index === data.length -1 ){

      let rate = 100 - accRate

      barData.push( { label: bar.label, count: bar.count, rate: rate, width: barMaxWidth * rate / 100} )

    }else{
      
      let rate = Math.floor( bar.count / total * 100)

      barData.push( { label: bar.label, count: bar.count, rate: rate, width: barMaxWidth * bar.count / total} )

      accRate += rate
    }

  })

  return barData
} 

let PercentBar = React.createClass({

  propTypes: {
    protections: React.PropTypes.array,
    total: React.PropTypes.number,
    barMaxWidth: React.PropTypes.number,
  },

  getInitialState: function(){
    return {}
  },

  componentDidMount: function(){
      
  },

  componentWillUnmount: function(){
  },

  renderBars: function() {

    var barData = getData( this.props.protections, this.props.barMaxWidth )

    var components = barData.map(function( bar ){
      return ( 
        <li key= {shortId.generate()} >
          <p className={css.p}>{bar.label}</p>
          <ProgressBar className={css.bar} width={bar.width} rate={bar.rate} count={bar.count}/>
          <span className={css.detail}> 
            <p>Count: {bar.count}</p> 
            <p>Rate: {bar.rate}%</p>
          </span>
        </li>
      )
    })
    return components       
  },

  render: function(){

    return (
        <div className={css.chart}>
          <ul className={css.ul}>
            {this.renderBars()}
          </ul>
        </div>
     )
  },

});

module.exports = PercentBar;
