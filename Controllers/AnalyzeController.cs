using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using weight_tracker.Managers;
using weight_tracker.Types;

namespace weight_tracker.Controllers
{
    [ApiController]
    [Route("api/analyze")]
    public class AnalyzeController(WeightAnalysis analyzer) : ControllerBase
    {
        private readonly WeightAnalysis _analyzer = analyzer;

        [HttpPost()]
        public IActionResult Analyze(List<Weight> weights)
        {
            if (ModelState.IsValid)
            {
                var result = _analyzer.Analyze(weights);
                return new JsonResult(result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}