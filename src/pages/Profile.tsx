import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInterceptor";
import type { User } from "../types";
import ProfileDetails from "../components/Profile/ProfileDetails";
import EditProfileForm from "../components/Profile/EditProfileForm";
import Button from "../components/Button";
import { logout } from "../api/logoutUser";
import Modal from "../components/Modal";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete("/users/me");
      logout();
    } catch (error) {
      console.log("Failed to delete user", error);
    } finally {
      setShowDeleteModal(false);
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
    <div className="min-h-screen bg-gray-300 text-black px-4 sm:px-10 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-semibold mb-1 flex items-center gap-2">
              <i className="fa-solid fa-user text-black text-xl" />
              My Profile
            </h2>
          </div>
          <Button onClick={handleEdit} variant="outline">
            <i className="fa-solid fa-pen-to-square mr-2" />
            Edit
          </Button>
        </div>

        {user ? (
          <ProfileDetails user={user} />
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
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

        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button
            className="w-full sm:w-auto"
            onClick={deleteMe}
            variant="danger"
          >
            <i className="fa-solid fa-trash mr-2" />
            Delete Profile
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={logout}
            variant="outline"
          >
            <i className="fa-solid fa-right-from-bracket mr-2" />
            Logout
          </Button>
        </div>
      </div>
      {showDeleteModal && (
        <Modal
          title="Delete Profile"
          message="Are you sure you want to delete your profile? This action cannot be undone."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default Profile;
