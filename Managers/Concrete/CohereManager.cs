using LlmTornado.Code;

namespace weight_tracker.Managers.Concrete
{
    public class CohereManager : BaseLlmManager
    {
        public CohereManager()
            : base(Environment.GetEnvironmentVariable("CohereApiKey"), LLmProviders.Cohere)
        {
        }
    }
}