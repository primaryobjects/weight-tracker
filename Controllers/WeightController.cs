using Microsoft.AspNetCore.Mvc;
using weight_tracker.Managers;
using weight_tracker.Types;

namespace weight_tracker.Controllers
{
    [ApiController]
    [Route("api/weights")]
    public class WeightController() : ControllerBase
    {
        [HttpGet()]
        public IActionResult GetWeights()
        {
            var result = WeightManager.Load();
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetWeight(string id)
        {
            var weight = WeightManager.Load(new Guid(id));
            return weight != null ? new JsonResult(weight) : NotFound();
        }

        [HttpPost()]
        public IActionResult CreateWeight(Weight weight)
        {
            if (ModelState.IsValid)
            {
                var result = WeightManager.Save(weight);
                return new JsonResult(result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWeight(string id, Weight weight)
        {
            weight.Id = new Guid(id);

            var result = WeightManager.Save(weight);
            return new JsonResult(result);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWeight(string id)
        {
            var weight = WeightManager.Load(new Guid(id));
            if (weight != null)
            {
                WeightManager.Delete(weight);
            }

            return weight != null ? new JsonResult(weight) : NotFound();
        }
    }
}