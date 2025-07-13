import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInterceptor";
import type { User } from "../types";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileDetails from "../components/Profile/ProfileDetails";
import EditProfileForm from "../components/Profile/EditProfileForm";
import Button from "../components/Button";
import { logout } from "../api/logoutUser";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = () => {
    if (user) {
      setForm(user);
      setEditModalOpen(true);
    }
  };

  const deleteMe = async () => {
    try {
      await axiosInstance.delete("/users/me");
      logout();
    } catch (error) {
      console.log("Failed to delete user", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/users/me", form);
      setEditModalOpen(false);
      fetchUser();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-10">
      <ProfileHeader onEdit={handleEdit} />
      {user ? (
        <ProfileDetails user={user} />
      ) : (
        <p className="text-center text-gray-600">Loading profile...</p>
      )}
      {editModalOpen && user && (
        <EditProfileForm
          form={form}
          userType={user.user_type}
          onChange={handleChange}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
      <div className="flex items-center justify-center mt-40">
        <Button
          className=""
          children={"delete profile"}
          onClick={deleteMe}
          variant="danger"
        />
      </div>
    </div>
  );
};

export default Profile;
