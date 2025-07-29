export default function StepThree({ data, prev }) {
  const handleConfirm = () => {
    // ارسال رزرو یا هر عملکردی
    alert('رزرو ثبت شد!');
  };

  return (
    <div>
      <h2 className="text-xl mb-4">تایید نهایی</h2>
      <p>نوع رزرو: {data.type}</p>
      <p>تاریخ شروع: {data.startDate}</p>
      <p>تاریخ پایان: {data.endDate}</p>

      <div className="flex justify-between mt-4">
        <button onClick={prev} className="bg-gray-300 px-4 py-2 rounded">مرحله قبل</button>
        <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded">تایید نهایی</button>
      </div>
    </div>
  );
}
