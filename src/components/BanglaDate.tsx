
"use client";

import { useEffect, useState } from "react";

const BanglaDate = () => {
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const formattedDate = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
        calendar: "gregory",
      }).format(new Date());

      setBanglaDate(formattedDate);
    };

    updateDate();
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <span>{banglaDate || "তারিখ লোড হচ্ছে..."}</span>
    </div>
  );
};

export default BanglaDate;
