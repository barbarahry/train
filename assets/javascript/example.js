Assets: {
    -KkBgUmX6BEeVyrudlfK: {
        id: '-KkBgUmX6BEeVyrudlfK',
        name: 'John',
        brand: 'HP'
    }
    -KkDYxfwka8YM6uFOWpH: {
        id: '-KkDYxfwka8YM6uFOWpH',
        name: 'Jack',
        brand: 'Dell'
    }
}


$("#table_body").on('click','.delete-btn', function(e){
    var rootRef = firebase.database().ref().child("Assets");
    var $row = $(this).closest('tr');
      
       var rowId = $row.data('id');

    //it should remove the firebase object in here
   
    rootRef.child(rowId).remove()
    //after firebase confirmation, remove table row
    .then(function() {
      $row.remove();
    })
    //Catch errors
    .catch(function(error) {
      console.log('ERROR');
    });  
});
rootRef.on("child_changed", snap => {
  var assetKey = snap.child("id").val();
  var name = snap.child("name").val();
  var brand = snap.child("brand").val();
$("#table_body").append("<tr data-id='"+assetKey+"'>"+
                          "<td>" + name + "</td>" +
                          "<td>" + brand + "</td>" +
                          "<td><div buttons>"+
                                  "<button class='delete-btn>delete</button>"+
                                  "</div></td></tr>");
});