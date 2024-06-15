using System.ComponentModel.DataAnnotations;

namespace weight_tracker.Types {
    public class Weight
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public required DateTime EntryDate { get; set; }
        [Required]
        public required double Value { get; set; }
        public string? Description { get; set; }

        public Weight()
        {
        }

        public Weight(double value, string? description = null)
            : this()
        {
            Value = value;
            Description = description;
        }

        public override string ToString()
        {
            return $"{Id} | {Value} | {Description}";
        }
    }
}