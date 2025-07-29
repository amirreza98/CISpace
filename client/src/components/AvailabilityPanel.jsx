export default function AvailabilityPanel({ data, step }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg mb-2">وضعیت رزرو</h3>
      {step === 1 && (
        <p>لطفاً نوع رزرو را انتخاب کنید تا وضعیت نمایش داده شود.</p>
      )}
      {step >= 2 && (
        <>
          <p>نوع: {data.type}</p>
          <p>از تاریخ: {data.startDate || '—'} تا {data.endDate || '—'}</p>
          {/* اینجا می‌تونی یک تقویم یا جدول رزرو براساس نوع و تاریخ بزاری */}
        </>
      )}
    </div>
  );
}
