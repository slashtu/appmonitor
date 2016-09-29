// modules
import React from 'react'
import {Link, scrollSpy} from'react-scroll' 

// components
import MitigationMAP from './Map'
import ProtectionTrend from './Trend/ProtectionTrend'
import ProtectionAnalytic from './Analytic/ProtectionAnalytic'

// css
import css from './Mitigation.css'

var style = {
  right: '50px',
  display: 'block'
}


var MitigationContainer = React.createClass({

  getInitialState: function(){
    return {}
  },

  componentDidMount:function() {
    scrollSpy.scrollHandler(document);
  },

  render: function() {
    return (
      <div className={css.mitigation}>
        <MitigationMAP name="ProtectionThreat"/>
        <ProtectionTrend name="ProtectionTrend" /> 
        <ul className="MainViewsMenu" style={style}>
                <li>
                    <Link to="ProtectionThreat" spy={true} smooth={true} offset={-250} duration={500}></Link>
                </li>
                <li>
                    <Link to="ProtectionTrend" spy={true} smooth={true} offset={-150} duration={500}></Link>
                </li>
            </ul>
      </div>
    );
  }

  // render: function() {
  //   return (
  //    <section id="MainViews-Protection" >  
  //      <ProtectionMitigation />
  //      <ProtectionThreat name="ProtectionThreat"/>
  //      <ProtectionTrend name="ProtectionTrend" /> 
  //      <ProtectionAnalytic name="ProtectionAnalytic"/>
  //      <ProtectionWAFLogs name="ProtectionWAFLogs"/>
  //      <ul className="MainViewsMenu" style={style}>
  //               <li>
  //                   <Link to="ProtectionThreat" defaultSelected={true} spy={true} smooth={true} offset={-200} duration={500}></Link>
  //               </li>
  //               <li>
  //                   <Link to="ProtectionTrend" spy={true} smooth={true} offset={-150} duration={500}></Link>
  //               </li>
  //               <li>
  //                   <Link to="ProtectionAnalytic" spy={true} smooth={true} offset={-100} duration={500}></Link>
  //               </li>
  //               <li>
  //                   <Link to="ProtectionWAFLogs" spy={true} smooth={true} offset={-120} duration={500}></Link>
  //               </li>
  //           </ul>
  //    </section>
  //   );
  // }

});

module.exports = MitigationContainer;