package com.test;

import static org.junit.Assert.*;

import javax.ws.rs.core.Response;

import org.json.JSONObject;
import org.junit.Test;

import com.lab8.TheaterService;


public class testTheaterService {

	TheaterService theater=new TheaterService();
	@Test
	public void test()throws Exception
	{
		
		Response response=theater.findTheater("kansas");
		String output = (String) response.getEntity();
		JSONObject json = new JSONObject(output);
		JSONObject jsonMeta = json.getJSONObject("meta");
		int status = (int)jsonMeta.getInt("code");
		if (status != 200) {
			System.out.println("Please check your input");
		}
		else
		{
			System.out.println("Executed successfully");
		}
		
	}

}
