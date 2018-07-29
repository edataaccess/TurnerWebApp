using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TurnerWebApp.Model
{
    public class TitleListItem
    {
        public string id { get; set; }
        public string TitleName { get; set; }

    }
}
