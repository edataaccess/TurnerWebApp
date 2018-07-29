using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TurnerWebApp.Model
{
    public class AwardItem
    {
        [BsonElement]
        public bool AwardWon { get; set; }
        [BsonElement]
        public int AwardYear { get; set; }
        [BsonElement]
        public string[] Participants { get; set; }
        [BsonElement]
        public string Award { get; set; }
        [BsonElement]
        public string AwardCompany { get; set; }

        //zero argument constructor must be present
        public AwardItem()
        {
        }

    }
}
