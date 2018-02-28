function saveCountry(Country) {
	var conn = $.hdb.getConnection();
	var output = JSON.stringify(Country);
	var fnCreateCountry = conn.loadProcedure("RBTinyWorld.Tinydb::createCountry");
	var result = fnCreateCountry({IM_COUNTRY: Country.name, IM_CONTINENT: Country.partof});
	
	conn.commit();
	conn.close();
	if(result && result.EX_ERROR !== null){
		return {
			body: result,
			status: $.net.http.BAD_REQUEST
		};
	}
	else{
		return {
			body: output,
			status: $.net.http.CREATED
		};
	}
}

var body = $.request.body.asString();
var Country = JSON.parse(body);
//validate the inputs
var output = saveCountry(Country);
$.response.contentType = "application/json";
$.response.setBody(output.body);
$.response.status = output.status;