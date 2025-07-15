import Button from "../Button";
import type { User } from "../../types";

interface Props {
  form: Partial<User>;
  userType: "doctor" | "patient";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProfileEditModal: React.FC<Props> = ({
  form,
  userType,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 z-10 bg-black/75 flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="first_name"
            value={form.first_name || ""}
            onChange={onChange}
            placeholder="First Name"
            className="border p-2 rounded"
            required
          />
          <input
            name="last_name"
            value={form.last_name || ""}
            onChange={onChange}
            placeholder="Last Name"
            className="border p-2 rounded"
            required
          />
          <input
            name="email"
            value={form.email || ""}
            onChange={onChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            name="phone_number"
            value={form.phone_number || ""}
            onChange={onChange}
            placeholder="Phone Number"
            className="border p-2 rounded"
            required
          />

          {userType === "doctor" ? (
            <>
              <input
                name="specialization"
                value={form.specialization || ""}
                onChange={onChange}
                placeholder="Specialization"
                className="border p-2 rounded col-span-1 md:col-span-2"
              />
              <textarea
                name="bio"
                value={form.bio || ""}
                onChange={onChange}
                placeholder="Bio"
                className="border p-2 rounded col-span-1 md:col-span-2"
                rows={4}
              />
            </>
          ) : (
            <>
              <input
                name="gender"
                value={form.gender || ""}
                onChange={onChange}
                placeholder="Gender"
                className="border p-2 rounded"
              />
              <input
                name="date_of_birth"
                type="date"
                value={form.date_of_birth?.split("T")[0] || ""}
                onChange={onChange}
                className="border p-2 rounded"
              />
            </>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditModal;
