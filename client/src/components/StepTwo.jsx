export default function StepTwo({ data, setData, next, prev }) {
  return (
    <div>
      <h2 className="text-xl mb-4">تاریخ رزرو را انتخاب کنید</h2>
      <input
        type="date"
        value={data.startDate || ''}
        onChange={(e) => setData({ ...data, startDate: e.target.value })}
        className="block mb-2"
      />
      <input
        type="date"
        value={data.endDate || ''}
        onChange={(e) => setData({ ...data, endDate: e.target.value })}
        className="block mb-4"
      />
      <div className="flex justify-between">
        <button onClick={prev} className="bg-gray-300 px-4 py-2 rounded">مرحله قبل</button>
        <button onClick={next} className="bg-blue-500 text-white px-4 py-2 rounded">ادامه</button>
      </div>
    </div>
  );
}
