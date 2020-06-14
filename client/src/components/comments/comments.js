import React from 'react'

const commtents = () => {
    style ={
        container:"",
        
    }
    
    return
    <>
        <div className="container">
            <h2>評論</h2>

            <div className="row">
                <a href="javascript:void(0)" onclick="openCity(event, 'London');">
                    <div className="col-6 tablink w3-bottombar w3-hover-light-grey w3-padding">評論</div>
                </a>
                <a href="javascript:void(0)" onclick="openCity(event, 'Paris');">
                    <div className="col-6 tablink w3-bottombar w3-hover-light-grey w3-padding">問與答</div>
                </a>      
            </div>

            <div id="London" className="w3-container city" style="display:none">
                <h2>London</h2>
                <p>London is the capital city of England.</p>
            </div>

            <div id="Paris" className="w3-container city" style="display:none">
                <h2>Paris</h2>
                <p>Paris is the capital of France.</p>
            </div>

            <div id="Tokyo" className="w3-container city" style="display:none">
                <h2>Tokyo</h2>
                <p>Tokyo is the capital of Japan.</p>
            </div>
        </div>
    </>
}

function openCity(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.firstElementChild.className += " w3-border-red";
  }
  </script>

export default comments 