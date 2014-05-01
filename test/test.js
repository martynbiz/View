var myView = new View({
  url: "data.php",
  dataType: "json",
  render: function(data) {
    var template, content;
    
    template = document.getElementById ("friends").innerHTML;
    content = _.template ( template, { friends: data } );
    
    document.getElementById("container").innerHTML = content; 
  }
});

myView.fetch();
