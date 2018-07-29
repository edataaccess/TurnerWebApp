using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TurnerWebApp.Model
{
    public class OtherNameItem
    {
        [BsonElement]
        public string TitleNameLanguage { get; set; }
        [BsonElement]
        public string TitleNameType { get; set; }
        [BsonElement]
        public string TitleNameSortable { get; set; }
        [BsonElement]
        public string TitleName { get; set; }

        //zero argument constructor must be present
        public OtherNameItem()
        {
        }

    }
}
