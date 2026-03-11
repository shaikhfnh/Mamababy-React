export function getLocalizedField(data, field, language) {
  if (!data) return "";

  // If Arabic (or any secondary language)
  if (language === "ar") {
    return data[`${field}_ar`] || data[field] || "";
  }

  // Default language (English)
  return data[field] || "";
}


// export function getLocalizedField(data, field, language) {
//   if (!data) return "";

//   const localizedKey = `${field}_ar`;

//   if (language === "ar") {
//     // Check if the translated field actually exists in the object
//     if (localizedKey in data) {
//       return data[localizedKey] ?? data[field] ?? "";
//     }
//   }

//   return data[field] ?? "";
// }
