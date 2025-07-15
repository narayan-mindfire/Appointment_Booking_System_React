import React, { useState } from "react";
import Input from "../components/Input";
import axiosInstance from "../api/axiosInterceptor";
import { validationService } from "../services/validation.service";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAppContext } from "../context/app.context";

type UserType = "doctor" | "patient";

interface Fields {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  user_type: UserType;
  password: string;
  specialization?: string;
  bio?: string;
  gender?: string;
  date_of_birth?: string;
}

const validationConfig: Record<
  string,
  Array<keyof ReturnType<typeof validationService>>
> = {
  first_name: ["isRequired"],
  last_name: ["isRequired"],
  email: ["isRequired", "isEmailFormat"],
  phone_number: ["isRequired"],
  password: ["isRequired"],
  user_type: ["isRequired"],
  specialization: ["isRequired"],
  bio: [],
  gender: ["isRequired"],
  date_of_birth: ["isRequired"],
};

const Register = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState<Fields>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    user_type: "doctor",
    specialization: "",
    bio: "",
    gender: "",
    date_of_birth: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validators = validationService();
  const {setState} = useAppContext(); 

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    let valid = true;
    const tempErrors: { [k: string]: string } = {};

    for (const key in fields) {
      const rules = validationConfig[key] || [];
      for (const rule of rules) {
        const validate = validators[rule];
        if (
          validate &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          !validate((fields as any)[key]) &&
          (fields.user_type === "doctor" ||
            (key !== "specialization" && key !== "bio")) &&
          (fields.user_type === "patient" ||
            (key !== "gender" && key !== "date_of_birth"))
        ) {
          tempErrors[key] = `${key.replace("_", " ")} is invalid.`;
          valid = false;
          break;
        }
      }
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const res = await axiosInstance.post("/auth/register", fields);
      setState("token", res.data.token);
      setState("userName", res.data.user_name)
      setState("userType", res.data.user_type)
      navigate(res.data.user_type === "doctor" ? "/doctor" : "/patient");
    } catch (err) {
      console.error("Registration Failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 shadow-2xl px-6">
      <form
        // onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg space-y-6 my-10"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="first_name"
            value={fields.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />
          <Input
            label="Last Name"
            name="last_name"
            value={fields.last_name}
            onChange={handleChange}
            error={errors.last_name}
          />
          <Input
            label="Email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            name="phone_number"
            value={fields.phone_number}
            onChange={handleChange}
            error={errors.phone_number}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={fields.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium mb-1">User Type</label>
            <select
              name="user_type"
              value={fields.user_type}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>
          </div>

          {fields.user_type === "doctor" && (
            <>
              <div className="w-full">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="specialization"
                >
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  value={fields.specialization}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
                {errors.specialization && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.specialization}
                  </p>
                )}
              </div>

              <Input
                label="Bio"
                name="bio"
                value={fields.bio!}
                onChange={handleChange}
                textarea
              />
            </>
          )}

          {fields.user_type === "patient" && (
            <>
              <Input
                label="Gender"
                name="gender"
                value={fields.gender!}
                onChange={handleChange}
                error={errors.gender}
              />
              <Input
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={fields.date_of_birth!}
                onChange={handleChange}
                error={errors.date_of_birth}
              />
            </>
          )}
        </div>

        <Button
          className="w-full mb-2"
          variant="default"
          children={"Register"}
          onClick={handleSubmit}
        />
        <p className="text-center mb-2">or</p>
        <Button
          className="w-full"
          variant="outline"
          children={"Log In"}
          onClick={() => navigate("/login")}
        />
      </form>
    </div>
  );
};

export default Register;
