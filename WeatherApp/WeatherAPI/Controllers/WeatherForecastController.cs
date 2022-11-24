using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WeatherAPI.Models; 

namespace WeatherAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase    {  

        private readonly ILogger<WeatherForecastController> _logger;
        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("GetCityDetails")]
        public async Task<IActionResult> GetCityDetails(string name)
        {
            CityDetails cityDetails = null;
            using (HttpClient client = new HttpClient())
            { 
                try
                {                 
                    string url = string.Format("https://geocoding-api.open-meteo.com/v1/search?name={0}", name);
                    HttpResponseMessage response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();
                    cityDetails = JsonConvert.DeserializeObject<CityDetails>(responseBody);
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                    _logger.LogError(e.Message);
                    return StatusCode((int)e.StatusCode, e.Message);
                }
            }
            return Ok(cityDetails);
        }

        [HttpGet]
        [Route("getWeatherData")]
        public async Task<IActionResult> getWeatherData(string latitude, string longitude,string hourly)
        {
            WeatherDetails weatherDetails = null;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string url = string.Format("https://api.open-meteo.com/v1/forecast?latitude={0}&longitude={1}&hourly={2}", latitude, longitude, hourly);
                    HttpResponseMessage response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();
                    weatherDetails = JsonConvert.DeserializeObject<WeatherDetails>(responseBody);
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine("\nException Caught!");
                    Console.WriteLine("Message :{0} ", e.Message);
                    _logger.LogError(e.Message);
                    return StatusCode((int)e.StatusCode, e.Message);
                }
            }
            return Ok(weatherDetails);
        }
    }
}