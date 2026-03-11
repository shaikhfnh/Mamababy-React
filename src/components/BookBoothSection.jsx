import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

export default function BookBoothSection({ data }) {
  const { language } = useLanguage();

  const categories = [
    "Baby Care Essentials",
    "Maternity Products",
    "Educational Toys and Learning Tools",
    "Child Safety and Monitoring",
    "Wellness and Nutrition",
    "Parenting Services",
    "Lifestyle and Home",
    "Tech for Families",
    "Fashion for Kids",
    "Entertainment Providers",
    "Medical Services",
  ];

  const categoryTranslations = {
  "Baby Care Essentials": "مستلزمات العناية بالطفل",
  "Maternity Products": "منتجات الأمومة",
  "Educational Toys and Learning Tools": "الألعاب التعليمية وأدوات التعلم",
  "Child Safety and Monitoring": "سلامة ومراقبة الطفل",
  "Wellness and Nutrition": "الصحة والتغذية",
  "Parenting Services": "خدمات الأسرة",
  "Lifestyle and Home": "أسلوب الحياة والمنزل",
  "Tech for Families": "التكنولوجيا للعائلات",
  "Fashion for Kids": "أزياء الأطفال",
  "Entertainment Providers": "مزودو الترفيه",
  "Medical Services": "الخدمات الطبية",
};

  const translations = {
    en: {
      companyName: "Company Name",
      contactName: "Contact Name",
      phone: "Phone Number",
      email: "Email",
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
      email: "البريد الإلكتروني",
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

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "phone") {
    const numeric = value.replace(/\D/g, "");
    setForm({ ...form, [name]: numeric });
    if (numeric.length >= 8) setErrors(prev => ({ ...prev, [name]: null }));
    return;
  }

  setForm({ ...form, [name]: value });

  // Clear error if field is now valid
  if (errors[name]) {
    switch(name) {
      case "companyName":
      case "contactName":
      case "location":
        if (value.length >= 3) setErrors(prev => ({ ...prev, [name]: null }));
        break;
      case "contactEmail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) setErrors(prev => ({ ...prev, [name]: null }));
        break;
      default:
        break;
    }
  }
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

    if (!form.instagram || form.instagram.length < 3)
         newErrors.instagram = t.min3;

    if (form.categories.length === 0)
      newErrors.categories = t.required;

    if (!form.sponsor) newErrors.sponsor = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const [isSubmitting, setIsSubmitting] = useState(false);
const [isSubmitted, setIsSubmitted] = useState(false);
const [submitError, setSubmitError] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  // Mark all fields as touched
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

  if (!validate()) return; // Stop submission if validation fails

  setIsSubmitting(true);
  setSubmitError(false);

  try {
    const response = await fetch(
      "https://test.mamababyexpo.com/wp-json/expo/v1/booth-enquiry",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const result = await response.json();

    if (result.success) {
      setIsSubmitted(true);

      // Optional: reset form
      setForm({
        companyName: "",
        contactName: "",
        phone: "",
        contactEmail: "",
        location: "",
        instagram: "",
        categories: [],
        sponsor: "",
      });

      // Reset button after 4 seconds
      setTimeout(() => setIsSubmitted(false), 4000);
    } else {
      setSubmitError(true);
    }
  } catch (error) {
    console.error(error);
    setSubmitError(true);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section className="relative "
    style={{
        backgroundImage: `url(${data?.background_image_booking})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} >
        
      <div className="mx-auto ">
        <div className="relative overflow-hidden  shadow-2xl">


          <div className="absolute inset-0 bg-white/20" />

          <div className="relative z-10 p-3 md:p-14 gap-4 my-4 md:my-0  grid md:grid-cols-[2fr_6fr] w-full ">
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  viewport={{ once: true }}
  className="flex justify-center items-start "
>
  <div className="w-full  text-start 
                  bg-white/70 backdrop-blur-xl 
                  border border-white/60 
                  shadow-2xl rounded-3xl 
                  p-4 md:p-6 lg:p-8">

    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      viewport={{ once: true }}
    className="text-4xl md:text-5xl text-center mb-2 md:mb-10 font-semibold text-[#486179]"
    >
                {getLocalizedField(data, `booking_heading`, language)}

    </motion.h2>

    {/* Subheading */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7 }}
      viewport={{ once: true }}
      className="text-base sm:text-lg md:text-xl 
                 text-gray-800 mb-6 
                 leading-relaxed max-w-3xl mx-auto"
    >
     {getLocalizedField(data, `booking_subheading`, language)}
    </motion.p>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      viewport={{ once: true }}
      className="text-sm sm:text-base md:text-lg 
                 text-gray-700 leading-relaxed 
                 max-w-2xl mx-auto"
    >
  {getLocalizedField(data, `booking_description`, language)}
    </motion.p>

  </div>
</motion.div>
            <motion.div className=" bg-white/70 backdrop-blur-xl 
                  border border-white/60  rounded-[30px] p-6 md:p-10 shadow-xl ">

              <form onSubmit={handleSubmit} className="space-y-3 text-black">

                {/* 2 Column Fields */}
                <div className="grid md:grid-cols-2 gap-3">
                  <Input {...fieldProps("companyName")} setTouched={setTouched} />
                  <Input {...fieldProps("contactName")} setTouched={setTouched}/>
                </div>

                <div className="grid md:grid-cols-2 gap-3" setTouched={setTouched}>
                  <Input {...fieldProps("phone")} setTouched={setTouched}/>
                <Input {...fieldProps("contactEmail")} setTouched={setTouched}/>

                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <Input {...fieldProps("location")} setTouched={setTouched}/>
                <Input {...fieldProps("instagram")} setTouched={setTouched}/>

                </div>


                {/* Categories */}
                <div>
                  <label className="font-normal  mb-3 block">
                    {t.category}
                  </label>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 border border-gray-300 rounded-xl p-4 max-h-52 md:max-h-full overflow-y-auto">
                    {categories.map((cat, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 flex items-center justify-center rounded border-2 ${
                            form.categories.includes(cat)
                              ? "bg-[#1D4B84] border-[#1D4B84]"
                              : "border-gray-500"
                          }`}
                        >
                          {form.categories.includes(cat) && (
                            <div className="w-2.5 h-2.5 bg-white rounded-sm" />
                          )}
                        </div>

                        <input
                          type="checkbox"
                          className="hidden"
                          checked={form.categories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                        />

                        <span className="text-sm">
  {language === "ar" ? categoryTranslations[cat] : cat}
</span>
                      </label>
                    ))}
                  </div>

                  {errors.categories && <Error message={errors.categories} />}
                </div>

                {/* Sponsor */}
                <div>
                  <label className="font-normal block mb-3">
                    {t.sponsor}
                  </label>

                  <div className="flex gap-6">
                    {["Yes", "No"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            form.sponsor === option
                              ? "border-[#1D4B84]"
                              : "border-gray-500"
                          }`}
                        >
                          {form.sponsor === option && (
                            <div className="w-2.5 h-2.5 bg-[#1D4B84] rounded-full" />
                          )}
                        </div>

                        <input
                          type="radio"
                          name="sponsor"
                          value={option}
                          className="hidden"
                          onChange={handleChange}
                        />

                        <span>{option === "Yes" ? t.yes : t.no}</span>
                      </label>
                    ))}
                  </div>

                  {errors.sponsor && <Error message={errors.sponsor} />}
                </div>
<motion.button
  whileHover={!isSubmitting && !isSubmitted ? { scale: 1.04 } : {}}
  whileTap={!isSubmitting && !isSubmitted ? { scale: 0.97 } : {}}
  type="submit"
  disabled={isSubmitting || isSubmitted}
  className={`
    w-full py-4 rounded-full font-semibold transition-all duration-300
    flex items-center justify-center gap-3
    ${
      isSubmitted
        ? "bg-green-600 text-white"
        : isSubmitting
        ? "bg-[#1D4B84]/70 text-white cursor-not-allowed"
        : "bg-[#1D4B84] text-white hover:bg-[#163a68]"
    }
  `}
>
  {isSubmitting && (
    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  )}

  {isSubmitted
    ? language === "ar"
      ? "تم الإرسال بنجاح"
      : "Submitted Successfully"
    : isSubmitting
    ? language === "ar"
      ? "جارٍ الإرسال..."
      : "Submitting..."
    : t.submit}
</motion.button>
{submitError && (
  <p className="text-red-500 text-sm mt-3 text-center">
    {language === "ar"
      ? "حدث خطأ أثناء الإرسال. حاول مرة أخرى."
      : "Something went wrong. Please try again."}
  </p>
)}

              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
function fieldProps(name, type = "text") {
  return {
    name,
    type,
    value: form[name],
    onChange: handleChange,
    placeholder: t[name],
    error: errors[name],
    touched,
    setTouched,
  };
}
}

/* Input Component */
function Input({ name, value, onChange, placeholder, type, error, touched, setTouched }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(prev => ({ ...prev, [name]: true }))}
        placeholder={placeholder}
        className={`w-full border rounded-full px-5 py-2 bg-white text-black text-md focus:outline-none transition
          ${error ? "border-red-500 focus:ring-1 focus:ring-red-400" : "border-gray-400 focus:ring-1 focus:ring-black"}
        `}
      />
      {error && <Error message={error} />}
    </div>
  );
}

/* Error */
function Error({ message }) {
  return (
    <p className="text-red-500 text-[11px] mt-2">
      {message}
    </p>
  );
}