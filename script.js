const x= document.getElementById("currtime-cont");
const y =document.getElementById("current-info");
const submit= document.getElementById("submit");
const apiKey="5168e5fce3d4a9489afddcd05bce68d";
const searchresult=document.getElementById("searchresult");
(function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getlatlon);
    } else { 
      x.innerHTML = "<h1>Geolocation is not supported by this browser.</h1>";
    }
  }());

  function getlatlon(position) {
    let lat=position.coords.latitude;
    let long=position.coords.longitude;
    fetchinfo(lat, long);
  }

  function fetchinfo(lat ,lon){
    
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=05168e5fce3d4a9489afddcd05bce68d`)
  .then(resp => resp.json())
  .then((result) => {
    
    // console.log(result.results[0].timezone.name)
    if (Object.keys(result).length!=0) { 
      y.innerHTML="";
      y.innerHTML=`<div>Name Of Time Zone : ${result.results[0].timezone.name}</div>
      <div id="latlon">
          <div>Lat : ${lat}</div>
          <div>Long : ${lon}</div>
      </div>
      <div>Offset STD : ${result.results[0].timezone.offset_STD}</div>
      <div>Offset STD Seconds : ${result.results[0].timezone.offset_STD_seconds}</div>
      <div>Offset DST : ${result.results[0].timezone.offset_DST}</div>
      <div>Offset DST Seconds : ${result.results[0].timezone.offset_DST_seconds}</div>
      <div>Country : ${result.results[0].country}</div>
      <div>Postcode : ${result.results[0].postcode}</div>
      <div>City : ${result.results[0].city}</div>`
    } else {
      y.innerHTML="Location Not found";
    }
  });
  }

  submit.addEventListener('click',()=>{
    let address = document.getElementById("address").value;
    if(address.trim()===""){
    searchresult.innerHTML=`
    Please enter an address.`
    searchresult.className="searchresult3";
    }

    else{
        address=encodeURIComponent(address);
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=05168e5fce3d4a9489afddcd05bce68d`)
  .then(response => response.json())
  .then(result => {
    
    if(result.features.length>=1){
        let arr=result.features[0];
        searchresult.innerHTML=`
        <div>Name Of Time Zone : ${arr.properties.timezone.name}</div>
            <div id="latlon">
                <div>Lat : ${arr.geometry.coordinates[0]}</div>
                <div>Long : ${arr.geometry.coordinates[1]}</div>
            </div>
            <div>Offset STD : ${arr.properties.timezone.offset_STD}</div>
            <div>Offset STD Seconds : ${arr.properties.timezone.offset_STD_seconds}</div>
            <div>Offset DST : ${arr.properties.timezone.offset_DST}</div>
            <div>Offset DST Seconds : ${arr.properties.timezone.offset_DST_seconds}</div>
            <div>Country : ${arr.properties.country}</div>
            <div>Postcode : ${arr.properties.postcode}</div>
            <div>City : ${arr.properties.city}</div>`;
        searchresult.className="searchresult1";    
    }
    else{
        searchresult.innerHTML=`
    Please enter a valid address.`
    searchresult.className="searchresult3";
    }
})
  .catch(error => console.log('error', error));
    }
  })
  