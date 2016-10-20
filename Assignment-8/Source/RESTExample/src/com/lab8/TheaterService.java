package com.lab8;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

@Path("/theaterservice")
public class TheaterService {

	@Path("{city}")
	@GET
	@Produces("application/json")
	public Response findTheater(@PathParam("city") String city) throws JSONException {

		String output = null;
		try {

			Client client = Client.create();
			WebResource web = client.resource("https://api.foursquare.com/v2/venues/search" +
                "?client_id=GNZX4JTWM3IHVXORIOHW0APZCFGKG4TZA5UVWVATGVJWQVTK" +
                "&client_secret=JRHDY0S3YN1UVD0F1DUDNTOEF1VE5D0RIRUITFMNIDV01BOI" +
                "&query=theater"+
                "&near=" + city +
                "&v=20160215&limit=1");
			ClientResponse response = web.accept("application/json").get(ClientResponse.class);
			output = response.getEntity(String.class);
			
			System.out.println(output + response.getStatus());
		} catch (Exception e) {
			
		}	
	
		return Response.status(200).entity(output).build();

	}
}
