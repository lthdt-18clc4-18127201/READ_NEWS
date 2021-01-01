 $(function() {
 	$.getJSON('data.json', function(data) {
		$.each(data, function(i, f) {
	   var tblRow = `	<li>
	   						<a href="/${f.id}">
							   <img src= ${f.img} alt=""> 
						   <h2>${f.title}<h2>
							   </a>
						   ${f.info}
							   
						</li>`
		$(tblRow).appendTo("main #left ul");
	  });
	});
     }); 
     // cái này mục đích làm gì ?// load json len html để t coi
