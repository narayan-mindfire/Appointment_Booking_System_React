import type { User } from "../../types";

const ProfileDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 border rounded-lg shadow p-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">Name</h2>
        <p>
          {user.first_name} {user.last_name}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">Email</h2>
        <p>{user.email}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">Phone Number</h2>
        <p>{user.phone_number}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-1">User Type</h2>
        <p className="capitalize">{user.user_type}</p>
      </div>

      {user.user_type === "doctor" ? (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-1">Specialization</h2>
            <p>{user.specialization}</p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-1">Bio</h2>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-1">Gender</h2>
            <p className="capitalize">{user.gender}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Date of Birth</h2>
            <p>{user.date_of_birth}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
