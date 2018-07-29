using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TurnerWebApp.Model
{
    public class StoryLineItem
    {
        [BsonElement]
        public string Description { get; set; }
        [BsonElement]
        public string Language { get; set; }
        [BsonElement]
        public string Type { get; set; }

        //zero argument constructor must be present
        public StoryLineItem()
        {
        }

    }
}
