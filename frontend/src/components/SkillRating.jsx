function SkillRating({ label, value, onChange, min = 1, max = 10 }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-secondary">{label}</label>
        <span className="text-sm font-semibold text-primary">{value}/10</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary-600"
      />
      <div className="flex justify-between text-xs text-tertiary mt-1">
        <span>Beginner</span>
        <span>Expert</span>
      </div>
    </div>
  );
}

export default SkillRating;
