using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using TurnerWebApp.Model;
using Newtonsoft.Json;

namespace TurnerWebApp.Controllers
{
    public class HomeController : Controller
    {
        private IMongoDatabase mongoDatabase;

        public IMongoDatabase GetMongoDatabase()
        {
            var mongoClient = new MongoClient("mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge");
            return mongoClient.GetDatabase("Titles");
        }

        public IActionResult Index()
        {
            mongoDatabase = GetMongoDatabase();

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetTitlesAsync(string searchString)
        {
            mongoDatabase = GetMongoDatabase();
            //FilterDefinition<BsonDocument> filter = FilterDefinition<BsonDocument>.Empty;
            // https: //docs.mongodb.com/manual/reference/operator/query/#query-selectors
            FilterDefinition<BsonDocument> filter = "{ TitleName: { $text: " + "searchString" + " } }";
            FindOptions<BsonDocument> options = new FindOptions<BsonDocument>
            {
                NoCursorTimeout = false
            };
            MongoDB.Driver.IAsyncCursor<BsonDocument> result = await mongoDatabase.GetCollection<BsonDocument>("Titles").FindAsync<BsonDocument>(filter, options);
            List<BsonDocument> resultDocs = result.ToList<BsonDocument>();

            //convert result to MediaItem
            MediaItem mItem = new MediaItem();
            List<MediaItem> mItemList = new List<MediaItem>();
            List<TitleListItem> mTitleList = new List<TitleListItem>();
            foreach (BsonDocument d in resultDocs)
            {
                mItem = JsonConvert.DeserializeObject<MediaItem>(d.ToJson());
                TitleListItem i = new TitleListItem();
                i.id = mItem._id.ToString();
                i.TitleName = mItem.TitleName;

                mTitleList.Add(i);
            }

            //return list of titles for view
            ViewBag["titlelist"] = mTitleList;

            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }


        //pass in MediaItem id value
        [HttpGet]
        public async Task<IActionResult> DetailsAsync(string titleId)
        {
            // get mongoDB Client
            mongoDatabase = GetMongoDatabase();

            // search mongoDB Collection
            FilterDefinition<BsonDocument> filter = "{ _id: " + titleId + " }";
            FindOptions<BsonDocument> options = new FindOptions<BsonDocument>
            {
                NoCursorTimeout = false
            };
            MongoDB.Driver.IAsyncCursor<BsonDocument> result = await mongoDatabase.GetCollection<BsonDocument>("Titles").FindAsync<BsonDocument>(filter, options);
            List<BsonDocument> resultDocs = result.ToList<BsonDocument>();

            //convert result to MediaItem
            MediaItem mItem = new MediaItem();
            if (resultDocs.Count > 0)
            {
                mItem = JsonConvert.DeserializeObject<MediaItem>(resultDocs[0].ToJson());
            }

            //return MediaItem (detail of selected Title) to View
            ViewBag["titleDetail"] = mItem;

            return View();
        }



    }
}
