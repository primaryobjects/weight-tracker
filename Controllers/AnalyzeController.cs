using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using weight_tracker.Managers;
using weight_tracker.Types;

namespace weight_tracker.Controllers
{
    public class AnalyzeModel
    {
        public required string Prompt { get; set; }
    }

    [ApiController]
    [Route("api/analyze")]
    public class AnalyzeController(WeightAnalysis analyzer) : ControllerBase
    {
        private readonly WeightAnalysis _analyzer = analyzer;

        [HttpPost()]
        public IActionResult Analyze(AnalyzeModel model)
        {
            var result = _analyzer.Analyze(WeightManager.Load(), model.Prompt);
            return new JsonResult(result);
        }
    }
}