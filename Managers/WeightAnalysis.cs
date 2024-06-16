using weight_tracker.Managers.Interface;
using weight_tracker.Types;

namespace weight_tracker.Managers
{
    public partial class WeightAnalysis(LLM llm)
    {
        private readonly LLM _llm = llm;

        public string? Analyze(List<Weight> weights, string? customPrompt = null)
        {
            string? output = null;

            try
            {
                Console.WriteLine($"Generating analysis for {weights.Count} weight readings.");

                string prompt = @$"
                You are an expert dietician and professional fitness coach experienced with the latest research on diets and intermittent fasting.
                Analyze the following list of weights recorded from an individual doing intermittent fasting on a 16/8 schedule.
                The analysis should be no longer than three short paragraphs. It should include a review of the weight trend, any fluctuations, a conclusion of the overall data, and recommendations for continued weight loss going forward.
                {customPrompt ?? ""}
                ";

                // Format the weights to include date, value, description.
                string data = "Date,Value,Description\n";
                weights.ForEach(weight => {
                    data += weight.EntryDate.ToShortDateString() + "," + weight.Value.ToString() + "," + weight.Description + "\n";
                });

                // Call the LLM.
                output = _llm.GetTextAsync(prompt, data).GetAwaiter().GetResult();
            }
            catch (Exception excep)
            {
                Console.WriteLine(excep.Message);
            }

            return output;
        }
    }
}