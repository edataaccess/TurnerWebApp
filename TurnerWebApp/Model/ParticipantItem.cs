using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TurnerWebApp.Model
{
    public class ParticipantItem
    {
        [BsonElement]
        public bool isKey { get; set; }
        [BsonElement]
        public string RoleType { get; set; }
        [BsonElement]
        public bool isOnScreen { get; set; }
        [BsonElement]
        public string ParticipantType { get; set; }
        [BsonElement]
        public string Name { get; set; }
        [BsonElement]
        public Int32 ParticipantId { get; set; }

        //zero argument constructor must be present
        public ParticipantItem()
        {
        }

    }
}
