export default function StepOne({ data, setData, next }) {
  const options = ['Event', 'Room', 'Seat'];

  return (
    <div>
      <h2 className="text-xl mb-4">چه چیزی می‌خواهید رزرو کنید؟</h2>
      <div className="flex gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              setData({ ...data, type: option });
              next();
            }}
            className="border p-4 rounded hover:bg-blue-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
