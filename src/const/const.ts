// configuration for form validation: array for each field will contain the validation that field will go through
export type ValidationRule = "isRequired" | "isEmailFormat";
const validationConfig : Record<string, ValidationRule[]> = {
    "name": ["isRequired"],
    "email": ["isRequired", "isEmailFormat"],
    "date": ["isRequired"],
    "doctor": ["isRequired"],
    "slot": ["isRequired"],
    "purpose": [],
}

// doctor list
const docs = [
  "Aarya Sharma",
  "Rohan Mehta",
  "Meera Nair",
  "Vihaan Kapoor",
  "Kavya Sinha",
  "Arjun Patel",
  "Isha Reddy",
  "Dev Malhotra",
  "Ananya Iyer",
  "Neil Deshmukh",
  "Tara Joshi",
  "Kunal Bansal",
  "Riya Choudhury",
  "Yash Verma",
  "Sneha Bhatt",
  "Aryan Singh",
  "Pooja Das",
  "Rahul Jain",
  "Nikita Roy",
  "Aditya Chauhan"
];

// global variables
export type Slot = "10:00" | "11:00" | "12:00" | "14:00" | "15:00" | "16:00" | "17:00";

export const slots: Slot[] = [
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export { validationConfig, docs, slots as allSlots };