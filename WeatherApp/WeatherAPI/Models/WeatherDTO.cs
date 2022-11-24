namespace WeatherAPI.Models
{
    public class WeatherDetails
    {
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string generationtime_ms { get; set; }
        public string utc_offset_seconds { get; set; }
        public string timezone { get; set; }
        public string timezone_abbreviation { get; set; }
        public string elevation { get; set; }

        public HourlyUnits hourly_units { get; set; }
        public Hourly hourly { get; set; }

    }   
    public class Hourly
    {
        public string[] time { get; set; }
        public decimal[] temperature_2m { get; set; }
        public decimal[] relativehumidity_2m { get; set; }
        public decimal[] windspeed_10m { get; set; }
        public decimal[] apparent_temperature { get; set; }
        public decimal[] snowfall { get; set; }
    }   
    public class HourlyUnits
    {
        public string time { get; set; }
        public string temperature_2m { get; set; }
        public string relativehumidity_2m { get; set; }
        public string windspeed_10m { get; set; }
        public string apparent_temperature { get; set; }
        public string snowfall { get; set; }

    }
    public class CityDetails
    {
        public Result[] results { get; set; }
        public decimal generationtime_ms { get; set; }
    }  

    public class Result
    {
        public int id { get; set; }
        public string name { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public decimal elevation { get; set; }
        public string feature_code { get; set; }
        public string country_code { get; set; }
        public int admin1_id { get; set; }
        public string timezone { get; set; }
        public int? population { get; set; }
        public int country_id { get; set; }
        public string country { get; set; }
        public string admin1 { get; set; }
        public int? admin2_id { get; set; }
        public string admin2 { get; set; }
        public int admin3_id { get; set; }

        public string? admin3 { get; set; }
    }

    public class APIError
    {
        public string Version { get; set; }
        public string StatusCode { get; set; }
        public string ErrorMessage { get; set; }
    }
}
