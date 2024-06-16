using Microsoft.EntityFrameworkCore;
using weight_tracker.Database;
using weight_tracker.Types;

namespace weight_tracker.Managers
{
    public static class WeightManager
    {
        public static List<Weight> Load()
        {
            using var context = new MyDbContext();
            return [.. context.Weights];
        }

        public static Weight? Load(Guid id)
        {
            using var context = new MyDbContext();
            return context.Weights.FirstOrDefault(weight => weight.Id == id);
        }

        public static Weight Save(Weight weight)
        {
            Weight result = weight;

            using var context = new MyDbContext();
            var existingWeight = context.Weights.Find(weight.Id);
            if (existingWeight != null)
            {
                existingWeight.EntryDate = weight.EntryDate;
                existingWeight.Description = weight.Description;
                existingWeight.Value = weight.Value;
                result = existingWeight;
            }
            else
            {
                context.Weights.Add(weight);
            }

            context.SaveChanges();

            return result;
        }

        public static void Delete(Weight weight)
        {
            using var context = new MyDbContext();
            context.Weights.Remove(weight);
            context.SaveChanges();
        }
    }
}