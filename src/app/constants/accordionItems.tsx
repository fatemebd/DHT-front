import type { CollapseProps } from "antd";

export const accordionItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "ثبت و یادآوری عادت جدید",
    children: (
      <p className="text-sm text-gray-600">
        با دوست میتونی عادت‌های جدید ثبت کنی و با بازه زمانی دلخواه براشون اعلان
        دریافت کنی
      </p>
    ),
  },
  {
    key: "2",
    label: "ثبت کارهای روزانه",
    children: (
      <p className="text-sm text-gray-600">
        میتونی کارهای روزانتو توی دوست ثبت کنی تا همیشه جلوی چشمت باشن و
        فراموششون نکنی.
      </p>
    ),
  },
  {
    key: "3",
    label: "ثبت یادآور جدید",
    children: (
      <p className="text-sm text-gray-600">
        توی دوست میتونی یادآور جدید ثبت کنی و براشون اعلان دریافت کنی تا قرارهای
        مهمت فراموشت نشه.
      </p>
    ),
  },
  {
    key: "4",
    label: "ثبت حال‌وهوای روزانه",
    children: (
      <p className="text-sm text-gray-600">
        توی دوست به صورت روزانه حالتو ثبت میکنی و میتونی بعد از یه ماه ببینی توی
        ماه گذشته حال و احوالت چطور بوده.
      </p>
    ),
  },
];
