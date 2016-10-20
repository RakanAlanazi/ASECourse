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

@Path("/movieservice")
public class MovieService {
	  @Path("{movie}")
	  @GET
	  @Produces("application/json")
	  public Response getMovieName(@PathParam("movie") String movie) throws JSONException {
		  
		  String output = null;
		  try {
			  
				Client client = Client.create();
				WebResource web = client.resource("https://www.omdbapi.com/?s="+movie);
				ClientResponse response = web.accept("application/json").get(ClientResponse.class);
				
				
				output = response.getEntity(String.class);
				
				System.out.println(output+ response.getStatus());
				
				
			} catch (Exception e) {
				
			}	
		  return Response.status(200).entity(output).build();
			
  }
}
