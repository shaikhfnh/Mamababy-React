import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

export default function BookBoothSection({ data }) {
  const { language } = useLanguage();

  const dynamicCategories = data?.categories_list.map((item, index) => ({
      id: item.id || `cat-${index}`,
      title: getLocalizedField(item, "title", language) || item.title || "Untitled",
      data:item.title || "Undefined!"
    }));

  const translations = {
    en: {
      companyName: "Company Name",
      contactName: "Contact Name",
      phone: "Phone Number",
      contactEmail: "Contact Email",
      location: "Company Location",
      instagram: "Instagram",
      category: "Category (Select more than one) *",
      sponsor: "Interested in becoming a sponsor? *",
      yes: "Yes",
      no: "No",
      submit: "Submit",
      required: "This field is required",
      min3: "Minimum 3 characters required",
      invalidEmail: "Enter a valid email address",
      phoneError: "Minimum 8 digits required",
    },
    ar: {
      companyName: "اسم الشركة",
      contactName: "اسم جهة الاتصال",
      phone: "رقم الهاتف",
      contactEmail: "البريد الإلكتروني",
      location: "موقع الشركة",
      instagram: "إنستغرام",
      category: "الفئة (يمكن اختيار أكثر من واحدة) *",
      sponsor: "هل أنت مهتم بأن تصبح راعياً؟ *",
      yes: "نعم",
      no: "لا",
      submit: "إرسال",
      required: "هذا الحقل مطلوب",
      min3: "الحد الأدنى 3 أحرف",
      invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
      phoneError: "الحد الأدنى 8 أرقام",
    },
  };

  const t = translations[language];

  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    contactEmail: "",
    location: "",
    instagram: "",
    categories: [],
    sponsor: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numeric = value.replace(/\D/g, "");
      setForm({ ...form, [name]: numeric });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (category) => {
    const updated = form.categories.includes(category)
      ? form.categories.filter((c) => c !== category)
      : [...form.categories, category];

    setForm({ ...form, categories: updated });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.companyName || form.companyName.length < 3)
      newErrors.companyName = t.min3;

    if (!form.contactName || form.contactName.length < 3)
      newErrors.contactName = t.min3;

    if (!form.location || form.location.length < 3)
      newErrors.location = t.min3;

    if (!form.phone || form.phone.length < 8)
      newErrors.phone = t.phoneError;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.contactEmail || !emailRegex.test(form.contactEmail))
      newErrors.contactEmail = t.invalidEmail;

// Extract Instagram username from input (username or URL)
const getInstagramUsername = (input) => {
  if (!input) return null;

  const trimmed = input.trim();

  // If it's a URL, extract the username
  const urlMatch = trimmed.match(
    /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9._]{1,30})\/?$/
  );
  if (urlMatch) return urlMatch[1];

  // Otherwise assume it's a username
  return trimmed;
};

// Validation
const username = getInstagramUsername(form.instagram);
const instagramRegex = /^(?!.*\.\.)(?!.*\.$)[a-zA-Z0-9._]{1,30}$/;

if (!username || !instagramRegex.test(username)) {
  newErrors.instagram =
    language === "ar"
      ? "اسم إنستغرام غير صالح"
      : "Enter a valid Instagram username or link";
} else {
  // Remove the error key entirely so it doesn't block submission
  if (newErrors.instagram) delete newErrors.instagram;
}

    // if (!form.instagram || form.instagram.length < 3)
    //   newErrors.instagram = t.min3;

    if (form.categories.length === 0)
      newErrors.categories = t.required;

    if (!form.sponsor) newErrors.sponsor = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      companyName: true,
      contactName: true,
      phone: true,
      contactEmail: true,
      location: true,
      instagram: true,
      categories: true,
      sponsor: true,
    });

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(false);
    console.log(form,"the form")
    // try {
    //   console.log("in the try")
    //   const response = await fetch(
    //     "https://www.mamababyexpo.com/wp-json/expo/v1/booth-enquiry",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(form),
    //     }
    //   );

    //   const result = await response.json();
    //   console.log(result,"the result in the email submission")
    //   if (result.success) {
    //     setIsSubmitted(true);
    //     setTimeout(() => setIsSubmitted(false), 4000);
    //   } else {
    //     setSubmitError(true);
    //   }
    // } catch {
    //   setSubmitError(true);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${data?.background_image_booking})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-10"
    >
      <div className="md:px-10 mx-auto px-4">

        <div className="grid lg:grid-cols-[2fr_3fr] md:place-items-center gap-6">

          {/* LEFT */}
          <div className="bg-white/80 backdrop-blur-xl border max-h-fit border-white/60 rounded-3xl p-6 md:p-10 shadow-xl select-none">

          <div className="text-4xl md:text-5xl font-bold text-[#486179] mb-6">
              {getLocalizedField(data, `booking_heading`, language)}
            </div>

            <div className="text-[#2F3E46] text-lg mb-4">
              {getLocalizedField(data, `booking_subheading`, language)}
            </div>

            <div className="text-[#52616B] text-lg">
              {getLocalizedField(data, `booking_description`, language)}
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl border border-white/60">

            <form onSubmit={handleSubmit} className="space-y-4 select-none">

              <div className="grid md:grid-cols-2 gap-4">
                <Input name="companyName" {...fieldProps("companyName")} />
                <Input name="contactName" {...fieldProps("contactName")} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input name="phone" {...fieldProps("phone")} />
                <Input name="contactEmail" {...fieldProps("contactEmail")} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input name="location" {...fieldProps("location")} />
                <Input name="instagram" {...fieldProps("instagram")} />
              </div>

              {/* Categories */}
              <div>
                <label className="text-[#1D4B84] font-medium mb-2 block">
                  {t.category}
                </label>

                <div className="grid lg:grid-cols-3 gap-2 border border-gray-300 rounded-xl p-4 max-h-48 lg:max-h-full overflow-y-auto">
                  {dynamicCategories.map((cat, i) => {
                    const selected = form.categories.includes(cat?.data);
                    return (
                      <div
                        key={i}
                        onClick={() => handleCategoryChange(cat.data)}
                        className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition
                          ${selected
                            ? "bg-[#1D4B84] text-white"
                            : "bg-white/20 text-[#2F3E46] border border-gray-300 hover:bg-gray-200"
                          }`}
                      >
                        {cat?.title}
                      </div>
                    );
                  })}
                </div>

                {errors.categories && <Error message={errors.categories} />}
              </div>

              {/* Sponsor */}
              <div>
                <label className="text-[#1D4B84] font-medium mb-2 block">
                  {t.sponsor}
                </label>

                <div className="flex gap-4">
                  {["Yes", "No"].map((opt) => {
                    const active = form.sponsor === opt;
                    return (
                      <div
                        key={opt}
                        onClick={() => setForm({ ...form, sponsor: opt })}
                        className={`px-3 py-1 font-medium rounded-full text-md cursor-pointer hover:scale-95 ease-in transition
                          ${active
                            ? "bg-[#1D4B84] text-white"
                            : "bg-gray-200 shadow-lg text-[#2F3E46] border border-gray-300"
                          }`}
                      >
                        {opt === "Yes" ? t.yes : t.no}
                      </div>
                    );
                  })}
                </div>

                {errors.sponsor && <Error message={errors.sponsor} />}
              </div>

              {/* Submit */}
              <motion.div
                onClick={handleSubmit}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-4 rounded-full text-center font-semibold cursor-pointer transition
                  ${isSubmitted
                    ? "bg-green-600 text-white"
                    : isSubmitting
                    ? "bg-[#1D4B84]/60 text-white"
                    : "bg-[#1D4B84] text-white hover:bg-[#163a68]"
                  }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : isSubmitted
                  ? "Submitted Successfully"
                  : t.submit}
              </motion.div>

              {submitError && (
                <div className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );

  function fieldProps(name) {
    return {
      value: form[name],
      onChange: handleChange,
      placeholder: t[name],
      error: errors[name],
    };
  }
}

/* Floating Label Input - FINAL */
function Input({ value, onChange, placeholder, name, error }) {
  const hasValue = value && value.length > 0;

  return (
    <div className="relative w-full">
      
      {/* Input */}
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full h-[52px] px-4 pt-4 pb-2 rounded-xl border bg-white text-[#1F2937]
        ${error ? "border-red-500" : "border-gray-300 focus:border-[#1D4B84]"}
        focus:outline-none transition-all duration-200`}
      />

      {/* Label */}
      <label
        className={`
          absolute left-3 px-1 bg-white rounded-xl
          transition-all duration-200 pointer-events-none

          ${
            hasValue
              ? "-top-2 text-xs text-[#1D4B84]"
              : "top-3 text-sm text-gray-500"
          }

          peer-focus:-top-2 
          peer-focus:text-xs 
          peer-focus:text-[#1D4B84]
        `}
      >
        {placeholder}
      </label>

      {/* Error */}
      {error && <Error message={error} />}
    </div>
  );
}

/* Error */
function Error({ message }) {
  return (
    <div className="text-red-500 text-xs mt-1">
      {message}
    </div>
  );
}