var key = "AIzaSyCyneQCAIqVHCXn0WBxmr0uX4KtxWIep40";
var doc = "1MagVUi2gnBO6JFGbeMUAuw2g2hrdPTaclvVGBtER";

var submitQuery = function(sql) {
	return $.ajax({
		url: "https://www.googleapis.com/fusiontables/v1/query",
		data: {
			key: key,
			sql: sql
		},
		dataType: "json"
	});
};

var renderItem = function(loadingNode, outputNode) {
	loadingNode.show();

	return function(data) {
		var row;
		
		loadingNode.hide();

		data.rows.forEach(function(item) {
			row = $("<tr/>").appendTo(outputNode);
			item.forEach(function(cell) {
				$("<td/>").text(cell ? cell : "").appendTo(row);
			});
		});

		outputNode.closest("table").show();
	};
};

var handleSubmit = function(event) {
	event.preventDefault();

	var sql, 
	    issn, 
	    title,
	    form = $(this),
	    loadingNode = form.find(".loading"),
	    outputNode = form.find(".output");

	switch (form.data("search")) {
		case "issn":
			issn = form.find("input[name=issn]").val().replace(/-/g, "");
			sql = "SELECT file, title FROM " + doc + " WHERE issn = '" + issn + "'";
		break;

		case "title":
			title = form.find("input[name=title]").val();
			sql = "SELECT nome, piso FROM " + doc ;
		break;
	}

	submitQuery(sql).done(renderItem(loadingNode, outputNode));
};

$("form").submit(handleSubmit);
