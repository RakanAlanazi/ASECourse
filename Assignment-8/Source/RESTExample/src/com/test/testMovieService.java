package com.test;

import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.junit.Test;

import com.lab8.MovieService;

public class testMovieService {
	MovieService movie=new MovieService();
@Test
public void test()throws Exception
{
	
	Response response=movie.getMovieName("758ty53uy");
	String output = (String) response.getEntity();
	JSONObject json = new JSONObject(output);
	JSONObject jsonMeta = json.getJSONObject("meta");
	int status = (int)jsonMeta.getInt("code");
	if (status != 200) {
		System.out.println("Please Check your input");
	}
	else
	{
		System.out.println("Executed successfully");
	}
	
}

}
