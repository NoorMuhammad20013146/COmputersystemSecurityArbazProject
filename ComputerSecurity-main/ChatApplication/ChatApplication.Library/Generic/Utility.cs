﻿using System.Text.Json;

namespace ChatApplication.Library.Generic
{
    public static class Utility
    {
        public static string ParseGithubResponse(string response)
        {
            var dictionary = ParseQueryString(response);
            string jsonString = JsonSerializer.Serialize(dictionary, new JsonSerializerOptions { WriteIndented = true });
            
            return jsonString;
        }
        public static Dictionary<string, string> ParseQueryString(string queryString)
        {
            return queryString.Split('&')
                              .Select(part => part.Split('='))
                              .ToDictionary(split => Uri.UnescapeDataString(split[0]),
                                            split => Uri.UnescapeDataString(split[1]));
        }
        public static String ExtractValuesByKey(string jsonString, string key)
        {
            string retValue = string.Empty;
            using (JsonDocument document = JsonDocument.Parse(jsonString))
            {
                if (document.RootElement.TryGetProperty(key, out JsonElement value))
                {
                    retValue = value.ToString();
                }
            }

            return retValue;
        }
    }
}
