using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Linq;


namespace TurnerWebApp.Model
{
    public class MediaItem
    {
        [BsonId]
        public ObjectId _id { get; set; }
        [BsonElement]
        public Int32 TitleId { get; set; }
        [BsonElement]
        public string TitleName { get; set; }
        [BsonElement]
        public string TitleNameSortable { get; set; }
        [BsonElement]
        public Int32 ReleaseYear { get; set; }
        [BsonElement]
        public AwardItem[] Awards { get; set; }
        [BsonElement]
        public string[] Genres { get; set; }
        [BsonElement]
        public string[] KeyGenres { get; set; }
        [BsonElement]
        public OtherNameItem[] OtherNames { get; set; }
        [BsonElement]
        public ParticipantItem[] Participants { get; set; }
        [BsonElement]
        public StoryLineItem[] StoryLines { get; set; }

        //zero argument constructor must be present
        public MediaItem()
        {
        }
    }

}
